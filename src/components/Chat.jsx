import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Streamdown, defaultRehypePlugins } from 'streamdown';
import { useEffect, useState } from 'react';

import { BookLink } from '@/components/BookLink';
import { usePrefersReducedMotion } from '@/components/MediaFrame';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/components/ui/input-group';
import { Marker, MarkerContent } from '@/components/ui/marker';
import {
    Message,
    MessageContent,
    MessageHeader,
} from '@/components/ui/message';
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import { Skeleton } from '@/components/ui/skeleton';

const MAX_CHARS = 1500;
const MAX_TURNS = 12;
const PLAN_TOOL = 'tool-present_app_plan';

const STARTERS = [
    'Turn my idea into an app plan',
    'What have you built with AI?',
    'How would you work with me?',
    'What does Novapaxx do?',
];

const safeRehypePlugins = Object.fromEntries(
    Object.entries(defaultRehypePlugins).filter(([name]) => name !== 'raw'),
);

const markdownClass =
    'max-w-none text-[15px] text-parchment [&_a]:underline [&_a]:underline-offset-[3px] [&_h1]:m-0 [&_h1]:mb-2 [&_h1]:text-base [&_h2]:m-0 [&_h2]:mb-2 [&_h2]:text-base [&_h3]:m-0 [&_h3]:mb-2 [&_h3]:text-[15px] [&_li]:m-0 [&_ol]:m-0 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p]:mb-3 [&_p]:max-w-none [&_ul]:m-0 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5';

class RestingError extends Error {
    constructor() {
        super('resting');
        this.name = 'RestingError';
    }
}

async function chatFetch(input, init) {
    let response;
    try {
        response = await fetch(input, init);
    } catch (error) {
        if (error?.name === 'AbortError') {
            throw error;
        }
        const network = new Error('network', { cause: error });
        network.name = 'NetworkError';
        throw network;
    }
    if (response.status === 429) {
        let body = null;
        try {
            body = await response.clone().json();
        } catch {
            body = null;
        }
        if (body?.error === 'resting') {
            throw new RestingError();
        }
    }
    return response;
}

const transport = new DefaultChatTransport({
    api: '/api/chat',
    fetch: chatFetch,
});

function isResting(error) {
    let current = error;
    while (current) {
        if (current.name === 'RestingError' || current.message === 'resting') {
            return true;
        }
        current = current.cause;
    }
    return false;
}

function textFrom(message) {
    return (message.parts ?? [])
        .filter((part) => part.type === 'text' && typeof part.text === 'string')
        .map((part) => part.text)
        .join('');
}

function stringList(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter((item) => typeof item === 'string' && item.trim());
}

function planToText(plan) {
    const features = stringList(plan.core_features)
        .map((item) => `- ${item}`)
        .join('\n');
    const uses = (Array.isArray(plan.ai_uses) ? plan.ai_uses : [])
        .filter((item) => item && (item.use || item.why || item.model_type))
        .map((item) => {
            const lead = [item.use, item.why].filter(Boolean).join(' — ');
            return `- ${lead}${item.model_type ? ` (${item.model_type})` : ''}`;
        })
        .join('\n');
    const phases = (Array.isArray(plan.phases) ? plan.phases : [])
        .filter((phase) => phase && (phase.name || phase.goal || phase.rough_duration_range))
        .map((phase) => {
            const name = phase.name || 'Phase';
            const duration = phase.rough_duration_range ? ` (${phase.rough_duration_range})` : '';
            const goal = phase.goal ? `: ${phase.goal}` : '';
            return `- ${name}${duration}${goal}`;
        })
        .join('\n');
    const risks = stringList(plan.risks)
        .map((item) => `- ${item}`)
        .join('\n');
    return [
        plan.idea_one_liner ? `Idea\n${plan.idea_one_liner}` : '',
        plan.who_its_for ? `Who it's for\n${plan.who_its_for}` : '',
        features ? `Core features\n${features}` : '',
        uses ? `Where AI helps\n${uses}` : '',
        plan.human_or_rule_based
            ? `What stays human or rule-based\n${plan.human_or_rule_based}`
            : '',
        phases ? `Phases\n${phases}\nrough, confirmed on a call` : '',
        risks ? `Risks\n${risks}` : '',
        plan.next_step ? `Next step\n${plan.next_step}` : '',
    ]
        .filter(Boolean)
        .join('\n\n');
}

function PlanSection({ title, children }) {
    if (!children) {
        return null;
    }
    return (
        <div className="flex flex-col gap-1">
            <p className="m-0 max-w-none text-[15px] font-semibold text-bone">{title}</p>
            <div className="text-[15px]">{children}</div>
        </div>
    );
}

function BulletList({ items }) {
    if (!items.length) {
        return null;
    }
    return (
        <ul className="m-0 flex list-disc flex-col gap-1 pl-5">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

function PlanCard({ part }) {
    const [copied, setCopied] = useState(false);
    const plan = part.input && typeof part.input === 'object' ? part.input : null;
    const streaming = part.state === 'input-streaming' || !plan;

    useEffect(() => {
        if (!copied) {
            return undefined;
        }
        const timeout = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timeout);
    }, [copied]);

    if (streaming) {
        return (
            <Card className="rounded-[8px] shadow-none" aria-busy="true">
                <CardHeader>
                    <CardTitle>App plan</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-1/2" />
                </CardContent>
            </Card>
        );
    }

    const features = stringList(plan.core_features);
    const uses = (Array.isArray(plan.ai_uses) ? plan.ai_uses : []).filter(
        (item) => item && (item.use || item.why || item.model_type),
    );
    const phases = (Array.isArray(plan.phases) ? plan.phases : []).filter(
        (phase) => phase && (phase.name || phase.goal || phase.rough_duration_range),
    );
    const risks = stringList(plan.risks);

    async function copyPlan() {
        try {
            await navigator.clipboard.writeText(planToText(plan));
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    return (
        <Card className="rounded-[8px] shadow-none">
            <CardHeader>
                <CardTitle>App plan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <PlanSection title="Idea">{plan.idea_one_liner}</PlanSection>
                <PlanSection title="Who it's for">{plan.who_its_for}</PlanSection>
                <PlanSection title="Core features">
                    <BulletList items={features} />
                </PlanSection>
                <PlanSection title="Where AI helps">
                    {uses.length ? (
                        <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
                            {uses.map((item) => (
                                <li key={`${item.use}-${item.why}`}>
                                    {[item.use, item.why].filter(Boolean).join('. ')}
                                    {item.model_type ? (
                                        <span className="text-muted-foreground">
                                            {' '}
                                            ({item.model_type})
                                        </span>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </PlanSection>
                <PlanSection title="What stays human or rule-based">
                    {plan.human_or_rule_based}
                </PlanSection>
                <PlanSection title="Phases">
                    {phases.length ? (
                        <div className="flex flex-col gap-2">
                            <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
                                {phases.map((phase) => (
                                    <li key={`${phase.name}-${phase.goal}`}>
                                        <span className="font-semibold text-bone">
                                            {phase.name || 'Phase'}
                                        </span>
                                        {phase.rough_duration_range
                                            ? ` (${phase.rough_duration_range})`
                                            : ''}
                                        {phase.goal ? `. ${phase.goal}` : ''}
                                    </li>
                                ))}
                            </ul>
                            <p className="m-0 max-w-none text-sm text-muted-foreground">
                                rough, confirmed on a call
                            </p>
                        </div>
                    ) : null}
                </PlanSection>
                <PlanSection title="Risks">
                    <BulletList items={risks} />
                </PlanSection>
                <PlanSection title="Next step">{plan.next_step}</PlanSection>
            </CardContent>
            <CardFooter className="flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={copyPlan}>
                    {copied ? 'Copied' : 'Copy plan'}
                </Button>
                <Button asChild>
                    <BookLink />
                </Button>
            </CardFooter>
        </Card>
    );
}

function AssistantText({ text, live, reduce }) {
    return (
        <Streamdown
            className={markdownClass}
            skipHtml
            rehypePlugins={Object.values(safeRehypePlugins)}
            controls={false}
            linkSafety={{ enabled: false }}
            animated={!reduce}
            caret={live && !reduce ? 'block' : undefined}
            isAnimating={live && !reduce}
            components={{
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                    >
                        {children}
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                ),
            }}
        >
            {text}
        </Streamdown>
    );
}

function hasPlan(messages) {
    return messages.some((message) =>
        (message.parts ?? []).some((part) => part.type === PLAN_TOOL),
    );
}

export function Chat() {
    const reduce = usePrefersReducedMotion();
    const [draft, setDraft] = useState('');
    const { messages, sendMessage, status, stop, error, regenerate, clearError } = useChat({
        transport,
    });
    const busy = status === 'submitted' || status === 'streaming';
    const userTurns = messages.filter((message) => message.role === 'user').length;
    const locked = userTurns >= MAX_TURNS && !busy;
    const resting = isResting(error);
    const finishedAssistants = messages.filter((message, index) => {
        if (message.role !== 'assistant') {
            return false;
        }
        return !(busy && index === messages.length - 1);
    }).length;
    const showNudge = finishedAssistants >= 3 && !hasPlan(messages);
    const canSend = draft.trim().length > 0 && !busy && !locked && !resting;

    function submitText(text) {
        const value = text.trim();
        if (!value || busy || locked || resting) {
            return;
        }
        clearError();
        sendMessage({ text: value });
        setDraft('');
    }

    function onSubmit(event) {
        event.preventDefault();
        submitText(draft);
    }

    function onKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    }

    return (
        <div className="flex h-[min(36rem,70dvh)] flex-col overflow-hidden rounded-[8px] border border-border bg-card">
            <MessageScrollerProvider autoScroll defaultScrollPosition="start">
                <MessageScroller className="min-h-0 flex-1">
                    <MessageScrollerViewport>
                        <MessageScrollerContent
                            aria-live="polite"
                            aria-busy={busy}
                            aria-relevant="additions text"
                        >
                            {messages.length === 0 ? (
                                <MessageScrollerItem messageId="greeting">
                                    <Message align="start">
                                        <MessageContent>
                                            <MessageHeader>Shaun's AI</MessageHeader>
                                            <p className="m-0 max-w-none px-3 text-[15px]">
                                                Ask about Shaun's work, or start with one of these.
                                            </p>
                                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                                                {STARTERS.map((starter) => (
                                                    <Button
                                                        key={starter}
                                                        type="button"
                                                        variant="outline"
                                                        className="h-auto min-h-12 w-full whitespace-normal text-left sm:w-auto"
                                                        disabled={busy || locked || resting}
                                                        onClick={() => submitText(starter)}
                                                    >
                                                        {starter}
                                                    </Button>
                                                ))}
                                            </div>
                                        </MessageContent>
                                    </Message>
                                </MessageScrollerItem>
                            ) : null}
                            {messages.map((message, index) => {
                                const live =
                                    busy &&
                                    index === messages.length - 1 &&
                                    message.role === 'assistant';
                                if (message.role === 'user') {
                                    const text = textFrom(message);
                                    if (!text) {
                                        return null;
                                    }
                                    return (
                                        <MessageScrollerItem
                                            key={message.id}
                                            messageId={message.id}
                                            scrollAnchor
                                        >
                                            <Message align="end">
                                                <MessageContent>
                                                    <Bubble variant="default" align="end">
                                                        <BubbleContent>{text}</BubbleContent>
                                                    </Bubble>
                                                </MessageContent>
                                            </Message>
                                        </MessageScrollerItem>
                                    );
                                }
                                const parts = message.parts ?? [];
                                const lastText = parts.findLastIndex(
                                    (part) => part.type === 'text' && part.text,
                                );
                                return (
                                    <MessageScrollerItem
                                        key={message.id}
                                        messageId={message.id}
                                    >
                                        <Message align="start">
                                            <MessageContent>
                                                <MessageHeader>Shaun's AI</MessageHeader>
                                                {parts.map((part, partIndex) => {
                                                    if (part.type === 'text' && part.text) {
                                                        return (
                                                            <AssistantText
                                                                key={`${message.id}-text-${partIndex}`}
                                                                text={part.text}
                                                                live={live && partIndex === lastText}
                                                                reduce={reduce}
                                                            />
                                                        );
                                                    }
                                                    if (part.type === PLAN_TOOL) {
                                                        return (
                                                            <PlanCard
                                                                key={part.toolCallId ?? `${message.id}-plan`}
                                                                part={part}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </MessageContent>
                                        </Message>
                                    </MessageScrollerItem>
                                );
                            })}
                            {showNudge ? (
                                <MessageScrollerItem messageId="book-nudge">
                                    <Marker>
                                        <MarkerContent>
                                            Want to talk it through?{' '}
                                            <BookLink className="inline-flex min-h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass" />
                                        </MarkerContent>
                                    </Marker>
                                </MessageScrollerItem>
                            ) : null}
                            {locked ? (
                                <MessageScrollerItem messageId="turn-limit">
                                    <Alert>
                                        <AlertDescription className="flex flex-col items-start gap-3">
                                            You've used the 12 messages. Book a call.
                                            <Button asChild>
                                                <BookLink />
                                            </Button>
                                        </AlertDescription>
                                    </Alert>
                                </MessageScrollerItem>
                            ) : null}
                            {resting ? (
                                <MessageScrollerItem messageId="resting">
                                    <Alert>
                                        <AlertDescription className="flex flex-col items-start gap-3">
                                            The chat's resting. Book a call instead.
                                            <Button asChild>
                                                <BookLink />
                                            </Button>
                                        </AlertDescription>
                                    </Alert>
                                </MessageScrollerItem>
                            ) : null}
                            {error && !resting ? (
                                <MessageScrollerItem messageId="chat-error">
                                    <Alert>
                                        <AlertDescription className="flex flex-col items-start gap-3">
                                            The reply didn't come through.
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => regenerate()}
                                            >
                                                Retry
                                            </Button>
                                        </AlertDescription>
                                    </Alert>
                                </MessageScrollerItem>
                            ) : null}
                        </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                </MessageScroller>
            </MessageScrollerProvider>
            <form
                onSubmit={onSubmit}
                className="flex shrink-0 flex-col gap-3 border-t border-border p-3"
            >
                <FieldGroup>
                    <Field data-disabled={locked || resting ? true : undefined}>
                        <FieldLabel htmlFor="chat-message">Message</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                id="chat-message"
                                name="message"
                                rows={3}
                                value={draft}
                                maxLength={MAX_CHARS}
                                disabled={locked || resting}
                                placeholder="Ask about a project, the stack, or how I ship it."
                                aria-describedby="chat-count chat-note"
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={onKeyDown}
                            />
                            <InputGroupAddon align="block-end" className="justify-end">
                                {busy ? (
                                    <Button type="button" onClick={() => stop()}>
                                        Stop
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={!canSend}>
                                        Send
                                    </Button>
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription id="chat-count" className="m-0 max-w-none">
                            {draft.length}/{MAX_CHARS}
                        </FieldDescription>
                        <FieldDescription id="chat-note" className="m-0 max-w-none">
                            Answers come from what Shaun's shared. Don't paste private info.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
