import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';

import { MediaFrame, usePrefersReducedMotion } from '@/components/MediaFrame';
import { familyStudy } from '@/content';
import { cn } from '@/lib/utils';

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

function asStill(media) {
    if (media.kind !== 'video') return media;
    return {
        ...media,
        kind: 'still',
        src: media.poster,
        src2x: null,
    };
}

function FrameStage({ steps, active, reduce }) {
    const [hold, setHold] = useState(active);
    const next = Math.min(active + 1, steps.length - 1);
    const aspect = (steps[active]?.slot.aspect || '16:10').replace(':', ' / ');

    useEffect(() => {
        if (reduce) {
            setHold(active);
            return undefined;
        }
        const id = window.setTimeout(() => setHold(active), 320);
        return () => window.clearTimeout(id);
    }, [active, reduce]);

    const indices = [];
    for (let index = 0; index < steps.length; index += 1) {
        if (index === active || index === hold || index === next) indices.push(index);
    }

    return (
        <div className="relative">
            <div
                aria-hidden="true"
                className="invisible rounded-[8px] border border-transparent"
            >
                <div className="h-9" />
                <div style={{ aspectRatio: aspect }} />
            </div>
            {indices.map((index) => {
                const step = steps[index];
                const current = index === active;
                return (
                    <motion.div
                        key={step.id}
                        className={cn('absolute inset-0', !current && 'pointer-events-none')}
                        style={{ zIndex: current ? 2 : 1 }}
                        initial={false}
                        animate={{ opacity: current ? 1 : 0 }}
                        transition={{
                            duration: reduce ? 0 : 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        aria-hidden={!current}
                        inert={current ? undefined : true}
                    >
                        <MediaFrame
                            slot={step.slot}
                            chrome="browser"
                            elevated
                            playback={current || index === hold}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}

function Bento() {
    return (
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:grid-cols-6">
            {familyStudy.bento.filter(Boolean).map((item) => {
                const span = item.span === 3 ? 'lg:col-span-3' : 'lg:col-span-2';
                if (item.bento === 'visual') {
                    return (
                        <li key={item.lead} className={span}>
                            <h3 className="mb-3">{item.lead}</h3>
                            <figure className="m-0">
                                <MediaFrame
                                    slot={asStill(item.slot)}
                                    chrome="device"
                                    ratio={item.ratio}
                                />
                                {item.slot.caption ? (
                                    <figcaption className="mt-3 text-sm leading-snug text-quiet">
                                        {item.slot.caption}
                                    </figcaption>
                                ) : null}
                            </figure>
                        </li>
                    );
                }

                return (
                    <li
                        key={item.lead}
                        className={cn(
                            span,
                            'rounded-[8px] border border-line bg-panel px-5 py-5',
                        )}
                    >
                        <h3>{item.lead}</h3>
                        <p className="mb-0">{item.body}</p>
                    </li>
                );
            })}
        </ul>
    );
}

export function FamilyStudy() {
    const desktop = useMinWidth(1024);
    const reduce = usePrefersReducedMotion();
    const stepRefs = useRef([]);
    const [active, setActive] = useState(0);
    const steps = useMemo(() => stepsForBand(familyStudy.steps), []);

    useEffect(() => {
        if (!desktop) return undefined;
        const nodes = stepRefs.current.slice(0, steps.length);
        if (!nodes.some(Boolean)) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting && entry.rootBounds);
                if (!visible.length) return;
                const bandMid =
                    visible[0].rootBounds.top + visible[0].rootBounds.height / 2;
                visible.sort((a, b) => {
                    const amid = a.boundingClientRect.top + a.boundingClientRect.height / 2;
                    const bmid = b.boundingClientRect.top + b.boundingClientRect.height / 2;
                    return Math.abs(amid - bandMid) - Math.abs(bmid - bandMid);
                });
                const index = nodes.indexOf(visible[0].target);
                if (index >= 0) setActive(index);
            },
            {
                rootMargin: '-40% 0px -40% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        nodes.forEach((node) => {
            if (node) observer.observe(node);
        });
        return () => observer.disconnect();
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
                                    className="flex min-h-[42svh] flex-col justify-center py-10"
                                >
                                    <StepIndex index={index} />
                                    <StepBody step={step} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="sticky top-24">
                                <FrameStage steps={steps} active={active} reduce={reduce} />
                                <p className="mb-0 mt-3 min-h-10 text-sm leading-snug text-quiet">
                                    {steps[active].slot.caption}
                                </p>
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

                <div className="mt-16 border-t border-line pt-12 md:mt-24">
                    <Bento />
                </div>
            </div>
        </section>
    );
}
