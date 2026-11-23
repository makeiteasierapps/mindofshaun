import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { MediaFrame, usePrefersReducedMotion } from '@/components/MediaFrame';
import { familyStudy } from '@/content';
import { cn } from '@/lib/utils';

const SWITCH_AFTER = 72;

const textLink =
    'text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass';

function useMinWidth(px) {
    const query = `(min-width: ${px}px)`;
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}

function slotHasMedia(slot) {
    return Boolean(slot && (slot.src || slot.poster));
}

function blocksFrom(step) {
    if (step.blocks?.length) {
        return step.blocks.map((block) => ({
            id: `${step.id}:${block.heading}`,
            heading: block.heading,
            body: block.body,
        }));
    }

    return [{ id: step.id, heading: step.heading, body: step.body }];
}

// Steps with no file yet are folded into the next step that has one.
// Add src or poster on the slot and that step comes back as its own frame.
function stepsForBand(steps) {
    const visible = [];
    let leadIn = [];

    for (const step of steps) {
        if (!slotHasMedia(step.slot)) {
            leadIn.push(...blocksFrom(step));
            continue;
        }

        visible.push(leadIn.length ? { ...step, leadIn } : step);
        leadIn = [];
    }

    if (leadIn.length && visible.length) {
        const last = visible[visible.length - 1];
        visible[visible.length - 1] = {
            ...last,
            leadIn: [...(last.leadIn || []), ...leadIn],
        };
    }

    return visible;
}

function StepBody({ step }) {
    const blocks = [...(step.leadIn || []), ...blocksFrom(step)];

    return blocks.map((block, index) => (
        <div key={block.id} className={index === 0 ? undefined : 'mt-8'}>
            <h3>{block.heading}</h3>
            <p className="mb-0">{block.body}</p>
        </div>
    ));
}

function StepIndex({ index }) {
    return (
        <span aria-hidden="true" className="mb-3 block text-[15px] font-semibold text-quiet">
            {String(index + 1).padStart(2, '0')}
        </span>
    );
}

function FrameStage({ steps, active, reduce }) {
    const aspect = (steps[0]?.slot.aspect || '16:10').replace(':', ' / ');

    return (
        <div className="relative w-full">
            <div
                aria-hidden="true"
                className="invisible rounded-[8px] border border-transparent"
            >
                <div className="h-9" />
                <div className="max-h-[calc(100svh-13.25rem)]" style={{ aspectRatio: aspect }} />
            </div>
            {steps.map((step, index) => {
                const current = index === active;
                return (
                    <div
                        key={step.id}
                        className={cn(
                            'absolute inset-0',
                            !current && 'pointer-events-none',
                            !reduce &&
                                'transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                        )}
                        style={{ opacity: current ? 1 : 0, zIndex: current ? 2 : 1 }}
                        aria-hidden={!current}
                        inert={current ? undefined : true}
                    >
                        <MediaFrame
                            slot={step.slot}
                            chrome="browser"
                            elevated
                            playback={current}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export function FamilyStudy() {
    const desktop = useMinWidth(1024);
    const reduce = usePrefersReducedMotion();
    const stepRefs = useRef([]);
    const activeRef = useRef(0);
    const [active, setActive] = useState(0);
    const steps = useMemo(() => stepsForBand(familyStudy.steps), []);

    useLayoutEffect(() => {
        if (!desktop) return undefined;

        const measure = () => {
            const focus = window.innerHeight / 2;
            let containing = -1;
            for (let index = 0; index < steps.length; index += 1) {
                const node = stepRefs.current[index];
                if (!node) continue;
                const rect = node.getBoundingClientRect();
                if (rect.top <= focus && rect.bottom >= focus) {
                    containing = index;
                    break;
                }
            }
            if (containing < 0) return;

            const current = activeRef.current;
            if (containing === current) return;

            const rect = stepRefs.current[containing].getBoundingClientRect();
            const into = containing > current ? focus - rect.top : rect.bottom - focus;
            if (into < SWITCH_AFTER) return;

            activeRef.current = containing;
            setActive(containing);
        };

        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = window.requestAnimationFrame(() => {
                raf = 0;
                measure();
            });
        };

        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) window.cancelAnimationFrame(raf);
        };
    }, [desktop, steps.length]);

    return (
        <section
            id="work"
            aria-labelledby="family-aha-title"
            className="border-t border-line"
        >
            <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
                <header className="max-w-[62ch]">
                    <h2 id="family-aha-title">{familyStudy.title}</h2>
                    <p className="text-parchment">{familyStudy.lede}</p>
                    <p>
                        <a
                            href={familyStudy.live.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${textLink} inline-flex min-h-11 items-center`}
                        >
                            {familyStudy.live.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </p>
                </header>

                {desktop ? (
                    <div className="mt-8 grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-x-12 lg:gap-x-16">
                        <div>
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    data-step={step.id}
                                    ref={(node) => {
                                        stepRefs.current[index] = node;
                                    }}
                                    className="flex min-h-[100svh] flex-col justify-center"
                                >
                                    <StepIndex index={index} />
                                    <StepBody step={step} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="sticky top-0 flex h-svh items-center">
                                <div className="relative mx-auto w-[min(100%,calc((100svh-13.25rem)*1.6))]">
                                    <FrameStage steps={steps} active={active} reduce={reduce} />
                                    <p className="absolute inset-x-0 top-full mb-0 mt-3 min-h-10 text-sm leading-snug text-quiet">
                                        {steps[active].slot.caption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-10">
                        {steps.map((step, index) => (
                            <article
                                key={step.id}
                                data-step={step.id}
                                className="border-t border-line py-10"
                            >
                                <StepIndex index={index} />
                                <StepBody step={step} />
                                <div className="mt-5">
                                    <MediaFrame slot={step.slot} chrome="browser" elevated />
                                    {step.slot.caption ? (
                                        <p className="mb-0 mt-3 text-sm leading-snug text-quiet">
                                            {step.slot.caption}
                                        </p>
                                    ) : null}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
