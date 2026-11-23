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

function fileName(src) {
    if (!src) return 'Still';
    const name = src.split('/').pop() || src;
    try {
        return decodeURIComponent(name);
    } catch {
        return name;
    }
}

function srcSetFor(src, src2x) {
    return src && src2x ? `${src} 1x, ${src2x} 2x` : undefined;
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
    const shouldPlayRef = useRef(false);
    const reduce = usePrefersReducedMotion();
    const [inView, setInView] = useState(false);
    const [near, setNear] = useState(false);
    const [paused, setPaused] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [frontMissing, setFrontMissing] = useState(false);
    const [backMissing, setBackMissing] = useState(false);
    const aspect = ratio || slot.aspect;
    const chromeMode = slot.chrome ?? chrome ?? 'browser';
    const fitMode = slot.fit ?? 'cover';
    const fitClass = fitMode === 'contain' ? 'object-contain' : 'object-cover';
    const isCollage = slot.kind === 'collage';
    const isVideo = slot.kind === 'video' && Boolean(slot.src) && !reduce;
    const stillSrc = isCollage ? null : slot.kind === 'video' ? slot.poster : slot.src;
    const stillAlt = slot.alt || slot.label || '';
    const showBack = Boolean(slot.back?.src) && !isCollage && !isVideo && !backMissing;
    const showFront = Boolean(stillSrc) && !frontMissing;
    shouldPlayRef.current = Boolean(isVideo && playback && inView && !paused);

    useEffect(() => {
        if (!isVideo) return undefined;
        const node = rootRef.current;
        if (!node) return undefined;
        const viewObserver = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 },
        );
        const nearObserver = new IntersectionObserver(
            ([entry]) => setNear(entry.isIntersecting),
            { rootMargin: '50% 0px', threshold: 0 },
        );
        viewObserver.observe(node);
        nearObserver.observe(node);
        return () => {
            viewObserver.disconnect();
            nearObserver.disconnect();
        };
    }, [isVideo]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isVideo) return undefined;
        video.muted = true;
        if (!video.getAttribute('src') && (near || inView)) {
            video.preload = 'auto';
            video.src = slot.src;
        }
        if (!playback || !inView || paused) {
            video.pause();
            return undefined;
        }
        if (!video.getAttribute('src')) return undefined;
        const play = video.play();
        if (play) play.catch(() => {});
        return undefined;
    }, [isVideo, inView, near, playback, paused, slot.src]);

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
            {chromeMode === 'browser' ? (
                <div
                    aria-hidden="true"
                    className="flex h-9 items-center gap-1.5 border-b border-line px-3"
                >
                    <span className="size-1.5 rounded-full bg-white/25" />
                    <span className="size-1.5 rounded-full bg-white/25" />
                    <span className="size-1.5 rounded-full bg-white/25" />
                </div>
            ) : null}
            <div
                className={cn('relative', fitMode === 'contain' ? 'bg-panel' : 'bg-raised')}
                style={{ aspectRatio: cssAspect(aspect) }}
            >
                {isCollage ? (
                    <Collage slot={slot} fitClass={fitClass} priority={priority} aspect={aspect} />
                ) : null}
                {showBack ? (
                    <img
                        src={slot.back.src}
                        srcSet={srcSetFor(slot.back.src, slot.back.src2x)}
                        alt=""
                        aria-hidden="true"
                        width={slot.width}
                        height={slot.height}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={priority ? 'high' : 'auto'}
                        onError={() => setBackMissing(true)}
                        className={cn(
                            'pointer-events-none absolute inset-0 h-full w-full -translate-x-[4%] -translate-y-[4%] opacity-40',
                            fitClass,
                        )}
                    />
                ) : null}
                {showFront ? (
                    <img
                        src={stillSrc}
                        srcSet={
                            slot.kind !== 'video' ? srcSetFor(slot.src, slot.src2x) : undefined
                        }
                        alt={isVideo ? '' : stillAlt}
                        width={slot.width}
                        height={slot.height}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={priority ? 'high' : 'auto'}
                        onError={() => setFrontMissing(true)}
                        className={cn('absolute inset-0 z-[1] h-full w-full', fitClass)}
                    />
                ) : null}
                {!isCollage && !isVideo && (!stillSrc || frontMissing) ? (
                    <Placeholder slot={slot} aspect={aspect} />
                ) : null}
                {isVideo ? (
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
                        onPlaying={() => setPlaying(true)}
                        onCanPlay={() => {
                            const video = videoRef.current;
                            if (!video || !shouldPlayRef.current) return;
                            const play = video.play();
                            if (play) play.catch(() => {});
                        }}
                        className={cn(
                            'absolute inset-0 z-[1] h-full w-full',
                            fitClass,
                            playing ? 'opacity-100' : 'opacity-0',
                            !reduce && 'transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
                        )}
                    />
                ) : null}
                {isVideo && playback ? (
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

function Collage({ slot, fitClass, priority, aspect }) {
    const images = slot.images ?? [];
    if (!images.length) return <Placeholder slot={slot} aspect={aspect} />;

    return (
        <div role="group" aria-label={slot.caption || undefined} className="absolute inset-0">
            {slot.layout === 'strip-3' ? (
                <Strip images={images} fitClass={fitClass} priority={priority} />
            ) : null}
            {slot.layout === 'stack' ? (
                <Stack images={images} fitClass={fitClass} priority={priority} />
            ) : null}
            {slot.layout !== 'strip-3' && slot.layout !== 'stack' ? (
                <TileGrid images={images} fitClass={fitClass} priority={priority} />
            ) : null}
        </div>
    );
}

function Strip({ images, fitClass, priority }) {
    return (
        <div className="absolute inset-0 flex items-stretch p-3 sm:p-4">
            {images.map((image, index) => (
                <div key={`${image.src}-${index}`} className="contents">
                    {index > 0 ? <Chevron /> : null}
                    <div className="h-full min-w-0 flex-1">
                        <Tile
                            image={image}
                            fitClass={fitClass}
                            priority={priority && index === 0}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function Chevron() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="mx-0.5 size-3 shrink-0 self-center text-quiet sm:mx-1 sm:size-4"
            fill="none"
        >
            <path
                d="M6 3.5 10.5 8 6 12.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function TileGrid({ images, fitClass, priority }) {
    return (
        <div
            className={cn(
                'absolute inset-0 grid grid-cols-3 gap-1.5 p-3 sm:gap-2 sm:p-4',
                images.length > 6 ? 'grid-rows-3' : 'grid-rows-2',
            )}
        >
            {images.map((image, index) => (
                <Tile
                    key={`${image.src}-${index}`}
                    image={image}
                    fitClass={fitClass}
                    priority={priority && index === 0}
                />
            ))}
        </div>
    );
}

function Stack({ images, fitClass, priority }) {
    const front = images[0];
    const back = images[1];

    return (
        <div className="absolute inset-0">
            {front ? (
                <div className="absolute bottom-[4%] right-[3%] z-10 h-[58%] w-[58%] shadow-[0_16px_32px_rgb(0_0_0/0.35)]">
                    <Tile image={front} fitClass={fitClass} priority={priority} />
                </div>
            ) : null}
            {back ? (
                <div className="absolute left-[3%] top-[4%] z-0 h-[58%] w-[58%]">
                    <Tile image={back} fitClass={fitClass} priority={false} />
                </div>
            ) : null}
        </div>
    );
}

function Tile({ image, fitClass, priority }) {
    const [missing, setMissing] = useState(false);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[6px] border border-line bg-panel">
            {!missing && image.src ? (
                <img
                    src={image.src}
                    srcSet={srcSetFor(image.src, image.src2x)}
                    alt={image.alt || ''}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={priority ? 'high' : 'auto'}
                    onError={() => setMissing(true)}
                    className={cn('absolute inset-0 h-full w-full', fitClass)}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center px-2 text-center">
                    <p className="m-0 max-w-none text-[11px] leading-snug text-quiet sm:text-sm">
                        {fileName(image.src)}
                    </p>
                </div>
            )}
        </div>
    );
}

function Placeholder({ slot, aspect }) {
    if (slot.label) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center">
                <p className="m-0 max-w-none text-[15px] font-semibold text-bone">{slot.label}</p>
            </div>
        );
    }

    const kind =
        slot.kind === 'video'
            ? 'Video + poster'
            : slot.kind === 'collage'
              ? `Collage · ${slot.layout || 'grid'}`
              : 'Still';

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center">
            <p className="m-0 max-w-none text-[15px] font-semibold text-bone">{slot.id}</p>
            <p className="m-0 max-w-none text-sm text-quiet">
                {aspect} · {slot.width}×{slot.height} / {slot.width2x}×{slot.height2x}
            </p>
            <p className="m-0 max-w-none text-sm text-quiet">{kind}</p>
        </div>
    );
}
