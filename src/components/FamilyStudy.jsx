import { useEffect, useRef, useState } from 'react';
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

function StepBody({ step }) {
    if (step.blocks) {
        return step.blocks.map((block) => (
            <div key={block.heading} className="mt-8 first:mt-0">
                <h3>{block.heading}</h3>
                <p className="mb-0">{block.body}</p>
            </div>
        ));
    }

    return (
        <>
            <h3>{step.heading}</h3>
            <p className="mb-0">{step.body}</p>
        </>
    );
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
    return (
        <div className="relative">
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    className={cn(
                            index === 0 ? 'relative' : 'absolute inset-0',
                            index !== active && 'pointer-events-none',
                        )}
                    style={{ zIndex: index === active ? 2 : 0 }}
                    initial={false}
                    animate={{ opacity: index === active ? 1 : 0 }}
                    transition={{
                        duration: reduce ? 0 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-hidden={index !== active}
                >
                    <div className={index === active ? undefined : 'pointer-events-none'}>
                        <MediaFrame
                            slot={step.slot}
                            chrome="browser"
                            elevated
                            playback={index === active}
                        />
                    </div>
                </motion.div>
            ))}
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
                            <p className="mb-3 mt-0 max-w-none text-[1.15rem] font-semibold leading-[1.25] tracking-[-0.02em] text-bone">
                                {item.lead}
                            </p>
                            <MediaFrame
                                slot={asStill(item.slot)}
                                chrome="device"
                                ratio={item.ratio}
                            />
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
                        <p className="m-0 text-[1.15rem] font-semibold leading-[1.25] tracking-[-0.02em] text-bone">
                            {item.lead}
                        </p>
                        <p className="mb-0 mt-2">{item.body}</p>
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
    const { steps } = familyStudy;

    useEffect(() => {
        if (!desktop) return undefined;
        const nodes = stepRefs.current.filter(Boolean);
        if (!nodes.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (!visible[0]) return;
                const index = nodes.indexOf(visible[0].target);
                if (index >= 0) setActive(index);
            },
            {
                rootMargin: '-40% 0px -40% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        nodes.forEach((node) => observer.observe(node));
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
                        <a href={familyStudy.live.href} className={textLink}>
                            {familyStudy.live.label}
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
                                    className="flex min-h-[70svh] flex-col justify-center py-10"
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
