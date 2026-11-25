import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';

import { BookLink } from '@/components/BookLink';
import { ProjectCard } from '@/components/ProjectCard';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/button';
import { email, profiles, projects, steps } from '@/content';

const Chat = lazy(() =>
    import('@/components/Chat').then((mod) => ({ default: mod.Chat })),
);
const LifeField = lazy(() =>
    import('@/LifeField').then((mod) => ({ default: mod.LifeField })),
);

function ChatFallback() {
    return (
        <div
            className="h-[min(36rem,70dvh)] rounded-[8px] border border-border bg-card"
            aria-busy="true"
        >
            <span className="sr-only">Loading chat…</span>
        </div>
    );
}

const wrap = 'mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-12';
const textLink =
    'inline-flex min-h-11 items-center text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass';

function Hero() {
    const reduce = usePrefersReducedMotion();

    return (
        <section id="top" aria-labelledby="hero-title" className={`${wrap} py-16 md:py-24`}>
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
                    and shipped. I’m Shaun, in Salt Lake City.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <Button asChild className="w-full sm:w-auto">
                        <BookLink />
                    </Button>
                    <Button asChild variant="link" className="w-full sm:w-auto">
                        <a href="#chat">Try the AI</a>
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}

function Ask() {
    return (
        <section
            id="chat"
            aria-labelledby="chat-title"
            className="border-t border-line py-16 md:py-20"
        >
            <div className={wrap}>
                <h2 id="chat-title">Ask about my work</h2>
                <p>Ask about a project, the stack, or how I ship it.</p>
                <Suspense fallback={<ChatFallback />}>
                    <Chat />
                </Suspense>
            </div>
        </section>
    );
}

function Projects() {
    return (
        <section
            id="work"
            aria-labelledby="work-title"
            className="border-t border-line py-16 md:py-24"
        >
            <div className={wrap}>
                <h2 id="work-title">Projects</h2>
                <div className="flex flex-col gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
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
                    What I ship stays hosted and watched on a platform I built.
                </p>
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
                    I’m Shaun Offenbacher. I live in Salt Lake City, and I
                    snowboard when there’s snow.
                </p>
                <p className="max-w-[40em]">
                    Novapaxx is my company. I build AI apps for founders and
                    small teams, and I ship them.
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
                className="absolute left-4 top-3 z-30 inline-flex min-h-11 -translate-y-[140%] items-center rounded-[6px] bg-brass px-3 text-[15px] font-semibold text-ground focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
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
                            ['#about', 'About'],
                            ['#contact', 'Contact'],
                        ].map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                className="inline-flex min-h-11 min-w-11 items-center justify-center text-[15px] text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass fine-hover:hover:text-brass"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>
            <main id="content">
                <Hero />
                <Ask />
                <Projects />
                <Process />
                <About />
                <Contact />
            </main>
            <footer className="border-t border-line">
                <div
                    className="relative h-16 overflow-hidden opacity-40"
                    aria-hidden="true"
                >
                    <Suspense fallback={null}>
                        <LifeField />
                    </Suspense>
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
