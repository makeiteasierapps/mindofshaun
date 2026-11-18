/** Paste the real booking link here. Every "Book a call" control uses this. */
export const BOOKING_URL = "https://example.com/replace-with-booking-link";

export const email = "shaunoffenbacher@yahoo.com";

export const profiles = [
    {
        label: "GitHub",
        href: "https://github.com/makeiteasierapps",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shaun-o-940b591b5/",
    },
    {
        label: "X (@makeiteasier_)",
        href: "https://x.com/makeiteasier_",
    },
];

export const studies = [
    {
        id: "family-aha",
        title: "Family AHA",
        lede: "A production family app whose daily ritual is written, fact-checked, illustrated, and personalized by a multi-stage AI pipeline.",
        live: { href: "https://familyaha.com", label: "Visit Family AHA" },
        parts: [
            {
                heading: "Problem",
                body: "Families need a short evening ritual they'll actually repeat. Generic AI copy goes stale, repeats itself, and can't be trusted with facts a kid might remember. It also has to feel like it belongs to this family, not a template.",
            },
            {
                heading: "The AI",
                items: [
                    {
                        lead: "Session writer",
                        body: "Claude writes each day's session as validated structured output. Earlier sessions go in as lines it isn't allowed to reuse.",
                    },
                    {
                        lead: "Grounded fact cards",
                        body: "Did You Know and Wonder aren't free-written. The model proposes what to research, the pipeline pulls real sources, and the cards are written from those passages. A ledger blocks reusing a fact.",
                    },
                    {
                        lead: "Uniqueness checks",
                        body: "A faster Claude model compares each session to past ones and rewrites only the parts that overlap.",
                    },
                    {
                        lead: "Daily story and guide letters",
                        body: "A second pass writes the night's story with its own rules against repeating plots. Then each animal guide writes a letter adapted to the kid's age.",
                    },
                    {
                        lead: "Session art",
                        body: "An LLM turns each finished card into an image prompt, and Flux 2 Pro paints a wordless illustration for it.",
                    },
                    {
                        lead: "Fact-check and repair",
                        body: "Claims are searched across Wikipedia, OpenAlex, and Tavily, then judged as supported, unsupported, or contradicted. A bad sentence can be swapped for another fact from the same sources.",
                    },
                    {
                        lead: "Family portraits",
                        body: "One uploaded photo gets repainted into a curated world. A vision model checks that the same people came back and repaints once if they didn't.",
                    },
                    {
                        lead: "Animal Guide quiz",
                        body: 'A small OpenAI model writes a personalized "why this guide" for each family member, with a safe fallback.',
                    },
                ],
            },
            {
                heading: "Engineering",
                body: "Every prompt is versioned in an admin studio. Generation runs as async jobs with progress for each stage, outputs are checked against a schema, and every provider call is logged with its cost.",
            },
            {
                heading: "Stack",
                body: "React, Tailwind, shadcn/ui, FastAPI, MongoDB, Ory Kratos, Stripe, Claude (Opus, Sonnet, Haiku), OpenAI, Flux 2 Pro, Tavily, TypeSafe Jev.",
            },
            {
                heading: "Outcome",
                body: "Live at familyaha.com, $8.88/month with a 7-day trial. I own it, and it runs on my own platform.",
            },
        ],
        media: [
            {
                src: "/work/01-did-you-know.webp",
                alt: "Did You Know card. An illustrated baby on a stone path, beside a fact about how often new walkers fall.",
                width: 1440,
                height: 900,
                caption: "Did You Know. The fact and the illustration for it.",
            },
            {
                src: "/work/02-wonder.webp",
                alt: "Wonder of the World card. An illustrated grass rope bridge in a canyon, with copy about Q'eswachaka in Peru.",
                width: 1440,
                height: 900,
                caption: "Wonder of the World. Written from the sources, not free-written.",
            },
            {
                src: "/work/03-portrait.webm",
                poster: "/work/03-portrait.webp",
                label: "Recording of a Family AHA portrait. Dev Family stands with a dog in a painted forest clearing.",
                width: 1440,
                height: 900,
                caption: "The family portrait, repainted into one world.",
            },
            {
                src: "/work/04-daily-story.webp",
                alt: "Daily story titled Gray's Origin: Step Off the Rock, told in the first person by a wolf named Gray.",
                width: 1440,
                height: 900,
                caption: "The night's story.",
            },
            {
                src: "/work/05-guide-letter.webp",
                alt: "Guide letter for Sam, an adult, from the Forest guide. The title is The One Who Owns It.",
                width: 1440,
                height: 900,
                caption: "A guide letter, adapted to that person's age.",
            },
            {
                src: "/work/06-quiz-reveal.webp",
                alt: "Animal Guide result for Maya. Her guide is Shilo, an eagle called The Dream Builder, with a short reason for the match.",
                width: 1440,
                height: 900,
                caption: "The Animal Guide quiz, with a reason for the match.",
            },
            {
                src: "/work/07-admin-generate.webm",
                poster: "/work/07-admin-generate.webp",
                label: "Recording of the AI Studio generating Taking Ownership. Session fields is the stage in progress.",
                width: 1440,
                height: 900,
                caption: "The admin studio, generating a session.",
            },
            {
                src: "/work/08-fact-check.webp",
                alt: "Fact-check in the admin studio. A Did You Know sentence is marked Supported, with source passages underneath.",
                width: 1440,
                height: 900,
                caption: "Fact-check. Supported, with the passages it came from.",
            },
        ],
    },
    {
        id: "observatory",
        title: "Observatory",
        lede: "AI that runs real systems.",
        live: null,
        parts: [
            {
                heading: "Problem",
                body: "A Kubernetes cluster produces more signals than a person should watch. Page someone for every blip, and they stop reading the page.",
            },
            {
                heading: "What I built",
                body: "Observatory scans those signals and opens a situation. The cluster is managed through GitOps. A person is paged only when a situation needs one.",
            },
            {
                heading: "The AI",
                body: "A judgment model classifies each situation into a closed playbook. Reversible fixes can run on their own. Anything else waits for approval. The model proposes. Code decides whether a write happens.",
            },
            {
                heading: "Stack",
                body: "Kubernetes, Flux, FastAPI, MongoDB, and TypeSafe for the judgment calls. Discord is how a page goes out.",
            },
            {
                heading: "Outcome",
                body: "This is the system that runs Family AHA and the rest of what I host. The ordinary state is silence.",
            },
        ],
        media: [],
    },
];

export const steps = [
    {
        n: "01",
        title: "Scope",
        body: "We name who it's for, what it has to do, and what is out of the engagement.",
    },
    {
        n: "02",
        title: "Build",
        body: "I design it and ship it to a real deployment. The AI is part of the product.",
    },
    {
        n: "03",
        title: "Run",
        body: "It stays hosted and watched. You hear about it when a situation needs a person.",
    },
];

export const offers = [
    {
        title: "AI Feature Sprint",
        body: "One AI feature in a product you already have, scoped and shipped.",
        featured: false,
    },
    {
        title: "AI MVP Build",
        body: "A new AI product, from the first scope through a running deployment.",
        featured: true,
    },
];
