import { motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LifeField } from '@/LifeField';
import {
    bookingUrl,
    email,
    offers,
    profiles,
    steps,
    studies,
} from '@/content';

const wrap = 'mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-12';

function Hero() {
    const reduce = useReducedMotion();

    return (
        <section
            id="top"
            aria-labelledby="hero-title"
            className={`${wrap} grid items-center gap-8 py-8 md:min-h-[calc(100svh-4.5rem)] md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:py-12`}
        >
            <motion.div
                className="order-2 min-w-0 md:order-1"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
                <h1 id="hero-title">
                    I build AI-powered apps and the systems that run them.
                </h1>
                <p className="max-w-[42ch] text-[17px] text-parchment">
                    For founders and small teams who want an AI product built
                    and shipped.
                </p>
                <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
                    <Button asChild className="w-full sm:w-auto">
                        <a href={bookingUrl}>Book a call</a>
                    </Button>
                    <Button asChild variant="link" className="w-full sm:w-auto">
                        <a href="#work">See the work</a>
                    </Button>
                </div>
            </motion.div>
            <div className="relative order-1 h-[28vh] min-h-40 md:order-2 md:h-[min(70vh,640px)]">
                <LifeField />
            </div>
        </section>
    );
}

function Study({ study }) {
    const hasMedia = study.shots.length > 0 || study.clip;

    return (
        <article
            id={study.id}
            aria-labelledby={`${study.id}-title`}
            className={
                hasMedia
                    ? 'grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16'
                    : undefined
            }
        >
            <div className={study.reverse ? 'lg:order-2' : undefined}>
                <h2 id={`${study.id}-title`}>{study.title}</h2>
                <p className="text-parchment">{study.lede}</p>
                {study.parts.map((part) => (
                    <div key={part.heading} className="mt-6">
                        <h3>{part.heading}</h3>
                        <p>{part.body}</p>
                    </div>
                ))}
                {study.live ? (
                    <p>
                        <a
                            href={study.live.href}
                            className="text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                        >
                            {study.live.label}
                        </a>
                    </p>
                ) : null}
            </div>
            {hasMedia ? (
            <div
                className={`flex flex-col gap-4 ${study.reverse ? 'lg:order-1' : ''}`}
            >
                {study.shots.map((shot) => (
                    <figure
                        key={shot.src}
                        className="overflow-hidden rounded-[8px] border border-line bg-panel"
                    >
                        <img
                            src={shot.src}
                            alt={shot.alt}
                            width={shot.width}
                            height={shot.height}
                            loading="lazy"
                            decoding="async"
                            className="block h-auto w-full"
                        />
                        <figcaption className="px-3 py-2.5 text-sm leading-snug text-quiet">
                            {shot.caption}
                        </figcaption>
                    </figure>
                ))}
                {study.clip ? (
                    <figure className="overflow-hidden rounded-[8px] border border-line bg-panel">
                        <video
                            controls
                            playsInline
                            muted
                            preload="none"
                            poster={study.clip.poster}
                            width="1440"
                            height="900"
                            aria-label={study.clip.label}
                            className="block h-auto w-full"
                        >
                            <source src={study.clip.src} type="video/webm" />
                        </video>
                        <figcaption className="px-3 py-2.5 text-sm leading-snug text-quiet">
                            {study.clip.caption}
                        </figcaption>
                    </figure>
                ) : null}
            </div>
            ) : null}
        </article>
    );
}

function Work() {
    return (
        <section id="work" aria-label="Work" className={`${wrap} py-24 md:py-32`}>
            <Study study={studies[0]} />
            <Separator className="my-24 md:my-32" />
            <Study study={studies[1]} />
        </section>
    );
}

function Process() {
    return (
        <section
            id="process"
            aria-labelledby="process-title"
            className="border-t border-line py-24 md:py-32"
        >
            <div className={wrap}>
                <h2 id="process-title">How I work</h2>
                <ol className="mt-8 grid list-none gap-0 p-0 md:grid-cols-3">
                    {steps.map((step) => (
                        <li
                            key={step.n}
                            className="border-t border-line py-5 md:pr-8"
                        >
                            <span className="mb-2 block text-[15px] font-semibold text-bone">
                                {step.n}
                            </span>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
                <p className="mt-8 text-bone">
                    Everything I ship is hosted and monitored on a platform I
                    built.
                </p>
            </div>
        </section>
    );
}

function Offers() {
    return (
        <section
            id="offers"
            aria-labelledby="offers-title"
            className="border-t border-line py-24 md:py-32"
        >
            <div className={wrap}>
                <h2 id="offers-title">Offers</h2>
                <div className="mt-8">
                    {offers.map((offer) => (
                        <article
                            key={offer.title}
                            className={
                                offer.featured
                                    ? 'mt-4 grid gap-3 rounded-[8px] border border-brass bg-raised px-6 py-6 md:grid-cols-[1fr_auto] md:items-baseline'
                                    : 'grid gap-3 border-t border-line py-6 md:grid-cols-[1fr_auto] md:items-baseline'
                            }
                        >
                            <h3>{offer.title}</h3>
                            <p className="text-xl font-semibold text-bone md:col-start-2 md:row-start-1 md:text-right">
                                [price]
                            </p>
                            <p className="md:col-start-1">{offer.body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section
            id="about"
            aria-labelledby="about-title"
            className="border-t border-line py-24 md:py-32"
        >
            <div className={wrap}>
                <h2 id="about-title">About</h2>
                <p className="max-w-[40em]">
                    I'm Shaun Offenbacher. I live in Salt Lake City, and I
                    snowboard when the snow is in. I build AI products for
                    founders and small teams, then I keep them running.
                </p>
                <p className="max-w-[40em]">
                    Family AHA is mine. Observatory is the platform under it,
                    and under the work I take on.
                </p>
            </div>
        </section>
    );
}

function Contact() {
    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="border-t border-line py-24 md:py-32"
        >
            <div className={wrap}>
                <h2 id="contact-title">Contact</h2>
                <p>Tell me what you want shipped.</p>
                <Button asChild className="mt-2 w-full sm:w-auto">
                    <a href={bookingUrl}>Book a call</a>
                </Button>
                <p className="mt-8 text-sm text-quiet">
                    Booking link [placeholder]
                </p>
                <p>
                    <a
                        href={bookingUrl}
                        className="break-all text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                    >
                        {bookingUrl}
                    </a>
                </p>
                <ul className="mt-6 list-none p-0">
                    <li>
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex min-h-11 items-center text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                        >
                            {email}
                        </a>
                    </li>
                    {profiles.map((profile) => (
                        <li key={profile.href}>
                            <a
                                href={profile.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                            >
                                {profile.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function Page() {
    return (
        <>
            <a
                href="#content"
                className="absolute left-4 top-3 z-30 -translate-y-[140%] rounded-[6px] bg-brass px-3 py-2 text-[15px] font-semibold text-ground focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
                Skip to content
            </a>
            <header className="sticky top-0 z-20 border-b border-line bg-ground">
                <div className={`${wrap} flex flex-wrap items-center gap-x-5 gap-y-1 py-3`}>
                    <a
                        href="#top"
                        className="inline-flex min-h-11 items-center text-[15px] font-semibold text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                    >
                        Shaun Offenbacher
                    </a>
                    <a
                        href={bookingUrl}
                        className="ml-auto inline-flex min-h-11 items-center text-[15px] font-semibold text-bone underline-offset-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass fine-hover:hover:underline md:order-3"
                    >
                        Book a call
                    </a>
                    <nav
                        aria-label="Sections"
                        className="order-3 flex w-full max-w-full flex-wrap gap-x-4 md:order-2 md:w-auto"
                    >
                        {[
                            ['#work', 'Work'],
                            ['#process', 'How I work'],
                            ['#offers', 'Offers'],
                            ['#about', 'About'],
                        ].map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                className="inline-flex min-h-11 items-center text-[15px] text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass fine-hover:hover:text-brass"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>
            <main id="content">
                <Hero />
                <div className="border-t border-line">
                    <Work />
                </div>
                <Process />
                <Offers />
                <About />
                <Contact />
            </main>
            <footer className="border-t border-line">
                <div className={`${wrap} flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-quiet`}>
                    <p className="m-0 max-w-none">Shaun Offenbacher, Salt Lake City</p>
                    <a
                        href={`mailto:${email}`}
                        className="inline-flex min-h-11 items-center text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                    >
                        {email}
                    </a>
                </div>
            </footer>
        </>
    );
}
