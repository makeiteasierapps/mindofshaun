import { motion } from 'motion/react';

import { FamilyStudy } from '@/components/FamilyStudy';
import { MediaFrame, usePrefersReducedMotion } from '@/components/MediaFrame';
import { Button } from '@/components/ui/button';
import { LifeField } from '@/LifeField';
import {
    BOOKING_URL,
    diagram,
    email,
    heroSlot,
    observatory,
    offers,
    profiles,
    steps,
} from '@/content';

const wrap = 'mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-12';
const wide = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12';
const textLink =
    'inline-flex min-h-11 items-center text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass';

function BookLink({ className, ...props }) {
    return (
        <a
            {...props}
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            Book a call
            <span className="sr-only"> (opens in a new tab)</span>
        </a>
    );
}

function Hero() {
    const reduce = usePrefersReducedMotion();

    return (
        <section
            id="top"
            aria-labelledby="hero-title"
            className={`${wrap} grid items-center gap-10 py-10 md:min-h-[calc(100svh-4.5rem)] md:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)] md:gap-14 md:py-16`}
        >
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: reduce ? 0 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                }}
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
                        <BookLink />
                    </Button>
                    <Button asChild variant="link" className="w-full sm:w-auto">
                        <a href="#work">See the work</a>
                    </Button>
                </div>
            </motion.div>
            <MediaFrame slot={heroSlot} chrome="browser" elevated priority />
        </section>
    );
}

function Diagram() {
    return (
        <ol className="m-0 mt-10 grid list-none gap-px overflow-hidden rounded-[8px] border border-line bg-line p-0 sm:grid-cols-3">
            {diagram.map((line, index) => (
                <li key={line} className="bg-raised px-4 py-4">
                    <span
                        aria-hidden="true"
                        className="mb-2 block text-[15px] font-semibold text-quiet"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="m-0 max-w-none text-[15px] font-semibold leading-snug text-bone">
                        {line}
                    </p>
                </li>
            ))}
        </ol>
    );
}

function Observatory() {
    return (
        <section
            id="observatory"
            aria-labelledby="observatory-title"
            className="border-t border-line bg-panel"
        >
            <div className={`${wide} py-20 md:py-28`}>
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-16">
                    <div>
                        <h2 id="observatory-title">{observatory.title}</h2>
                        <p className="text-parchment">{observatory.lede}</p>
                        {observatory.parts.map((part) => (
                            <div key={part.heading} className="mt-8">
                                <h3>{part.heading}</h3>
                                <p className="mb-0">{part.body}</p>
                            </div>
                        ))}
                        <Diagram />
                    </div>
                    <div className="lg:sticky lg:top-24">
                        <MediaFrame
                            slot={observatory.slot}
                            chrome="browser"
                            elevated
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Process() {
    return (
        <section
            id="process"
            aria-labelledby="process-title"
            className="border-t border-line py-12 md:py-16"
        >
            <div className={wrap}>
                <h2 id="process-title">How I work</h2>
                <ol className="mt-6 grid list-none gap-0 p-0 md:grid-cols-3">
                    {steps.map((step) => (
                        <li key={step.n} className="border-t border-line py-5 md:pr-8">
                            <span className="mb-2 block text-[15px] font-semibold text-bone">
                                {step.n}
                            </span>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
                <p className="mt-6 text-bone">
                    Everything I ship is hosted and monitored on a platform I
                    built.
                </p>
            </div>
        </section>
    );
}

function isPlaceholder(value) {
    return typeof value !== 'string' || /^\[[^\]]*\]$/.test(value.trim());
}

function Offers() {
    return (
        <section
            id="offers"
            aria-labelledby="offers-title"
            className="border-t border-line py-16 md:py-24"
        >
            <div className={wrap}>
                <h2 id="offers-title">Offers</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {offers.map((offer) => {
                        const pricePending = isPlaceholder(offer.price);
                        const timelinePending = isPlaceholder(offer.timeline);
                        return (
                            <article
                                key={offer.title}
                                className={
                                    offer.featured
                                        ? 'flex h-full flex-col rounded-[8px] border border-brass bg-raised px-6 py-6 md:px-8 md:py-8'
                                        : 'flex h-full flex-col rounded-[8px] border border-line bg-panel px-6 py-6 md:px-8 md:py-8'
                                }
                            >
                                <h3>{offer.title}</h3>
                                {pricePending ? (
                                    <p className="m-0 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-bone">
                                        Scoped on a call
                                    </p>
                                ) : (
                                    <p className="m-0 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-bone">
                                        <span className="sr-only">Price: </span>
                                        {offer.price}
                                    </p>
                                )}
                                <dl className="m-0">
                                    <dt className="mb-2 mt-5 text-[15px] text-quiet">
                                        Included
                                    </dt>
                                    <dd className="m-0">
                                        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 marker:text-brass">
                                            {offer.included.map((item) => (
                                                <li key={item} className="pl-1">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </dd>
                                    {timelinePending ? null : (
                                        <>
                                            <dt className="mb-1 mt-5 text-[15px] text-quiet">
                                                Timeline
                                            </dt>
                                            <dd className="m-0 font-semibold text-bone">
                                                {offer.timeline}
                                            </dd>
                                        </>
                                    )}
                                </dl>
                                <div className="mt-auto pt-6">
                                    <Button asChild className="w-full">
                                        <BookLink />
                                    </Button>
                                </div>
                            </article>
                        );
                    })}
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
            className="border-t border-line py-16 md:py-20"
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
            className="border-t border-line bg-panel py-28 md:py-40"
        >
            <div className={wrap}>
                <p className="m-0 text-[15px] font-semibold text-quiet">Contact</p>
                <h2
                    id="contact-title"
                    className="mt-3 text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05]"
                >
                    Tell me what you want shipped
                </h2>
                <Button asChild className="mt-8 w-full sm:w-auto">
                    <BookLink />
                </Button>
                <ul className="mt-8 flex list-none flex-wrap gap-x-6 p-0">
                    <li>
                        <a href={`mailto:${email}`} className={textLink}>
                            {email}
                        </a>
                    </li>
                    {profiles.map((profile) => (
                        <li key={profile.href}>
                            <a
                                href={profile.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={textLink}
                            >
                                {profile.label}
                                <span className="sr-only"> (opens in a new tab)</span>
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
                    <BookLink className="ml-auto inline-flex min-h-11 items-center text-[15px] font-semibold text-bone underline-offset-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass fine-hover:hover:underline md:order-3" />
                    <nav
                        aria-label="Sections"
                        className="order-3 flex w-full max-w-full flex-wrap gap-x-4 md:order-2 md:w-auto"
                    >
                        {[
                            ['#work', 'Work'],
                            ['#observatory', 'Observatory'],
                            ['#process', 'How I work'],
                            ['#offers', 'Offers'],
                            ['#about', 'About'],
                            ['#contact', 'Contact'],
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
                <FamilyStudy />
                <Observatory />
                <Process />
                <Offers />
                <About />
                <Contact />
            </main>
            <footer className="border-t border-line">
                <div
                    className="relative h-16 overflow-hidden opacity-40"
                    aria-hidden="true"
                >
                    <LifeField />
                </div>
                <div className={`${wrap} py-6`}>
                    <p className="m-0 max-w-none text-sm text-quiet">
                        Shaun Offenbacher, Salt Lake City
                    </p>
                </div>
            </footer>
        </>
    );
}
