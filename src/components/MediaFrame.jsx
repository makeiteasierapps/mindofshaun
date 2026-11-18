import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export function usePrefersReducedMotion() {
    const [reduce, setReduce] = useState(() => prefersReducedMotion());

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduce(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    return reduce;
}

function prefersReducedMotion() {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

function cssAspect(value) {
    return value.replace(':', ' / ');
}

export function MediaFrame({
    slot,
    chrome = 'browser',
    ratio,
    elevated = false,
    playback = true,
    priority = false,
    className,
}) {
    const rootRef = useRef(null);
    const videoRef = useRef(null);
    const reduce = usePrefersReducedMotion();
    const [inView, setInView] = useState(false);
    const [paused, setPaused] = useState(false);
    const aspect = ratio || slot.aspect;
    const showVideo =
        slot.kind === 'video' && Boolean(slot.src) && playback && !reduce;
    const stillSrc = slot.kind === 'video' ? slot.poster : slot.src;
    const stillAlt = slot.alt || slot.label || '';

    useEffect(() => {
        if (!showVideo) return undefined;
        const node = rootRef.current;
        if (!node) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [showVideo]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !showVideo) return undefined;
        video.muted = true;
        if (!inView || paused) {
            video.pause();
            return undefined;
        }
        if (!video.src) {
            video.preload = 'metadata';
            video.src = slot.src;
        }
        const play = video.play();
        if (play) play.catch(() => {});
        return undefined;
    }, [showVideo, inView, paused, slot.src]);

    return (
        <div
            ref={rootRef}
            data-slot={slot.id}
            className={cn(
                'overflow-hidden rounded-[8px] border border-line bg-panel',
                elevated && 'shadow-[0_24px_48px_rgb(0_0_0/0.35)]',
                className,
            )}
        >
            {chrome === 'browser' ? (
                <div
                    aria-hidden="true"
                    className="flex h-9 items-center gap-1.5 border-b border-line px-3"
                >
                    <span className="size-1.5 rounded-full bg-white/25" />
                    <span className="size-1.5 rounded-full bg-white/25" />
                    <span className="size-1.5 rounded-full bg-white/25" />
                </div>
            ) : null}
            <div className="relative bg-raised" style={{ aspectRatio: cssAspect(aspect) }}>
                {stillSrc ? (
                    <img
                        src={stillSrc}
                        srcSet={
                            slot.kind !== 'video' && slot.src2x
                                ? `${slot.src} 1x, ${slot.src2x} 2x`
                                : undefined
                        }
                        alt={showVideo ? '' : stillAlt}
                        width={slot.width}
                        height={slot.height}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={priority ? 'high' : 'auto'}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : null}
                {!stillSrc && !showVideo ? (
                    <Placeholder slot={slot} aspect={aspect} />
                ) : null}
                {showVideo ? (
                    <video
                        ref={videoRef}
                        poster={slot.poster || undefined}
                        width={slot.width}
                        height={slot.height}
                        muted
                        loop
                        playsInline
                        controls={false}
                        preload="none"
                        disablePictureInPicture
                        tabIndex={-1}
                        aria-label={slot.label || slot.alt || slot.id}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : null}
                {showVideo ? (
                    <button
                        type="button"
                        className="absolute bottom-3 right-3 z-10 inline-flex h-11 items-center rounded-[6px] border border-line bg-ground/90 px-3 text-[15px] font-semibold text-bone transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] fine-hover:hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass active:scale-[0.97]"
                        onClick={() => setPaused((value) => !value)}
                    >
                        {paused ? 'Play' : 'Pause'}
                        <span className="sr-only"> video</span>
                    </button>
                ) : null}
            </div>
        </div>
    );
}

function Placeholder({ slot, aspect }) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center">
            <p className="m-0 max-w-none text-[15px] font-semibold text-bone">{slot.id}</p>
            <p className="m-0 max-w-none text-sm text-quiet">
                {aspect} · {slot.width}×{slot.height} / {slot.width2x}×{slot.height2x}
            </p>
            <p className="m-0 max-w-none text-sm text-quiet">
                {slot.kind === 'video' ? 'Video + poster' : 'Still'}
            </p>
        </div>
    );
}
