/** Replace before launch. */
export const bookingUrl = "https://example.com/replace-with-booking-link";

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
        lede: "A consumer AI app, built and billed end to end.",
        reverse: false,
        live: { href: "https://familyaha.com", label: "Visit Family AHA" },
        parts: [
            {
                heading: "Problem",
                body: "Families lose the ordinary minutes to screens and rush. They need a ritual short enough to happen, and a portrait of the people who are actually there.",
            },
            {
                heading: "What I built",
                body: "The product, end to end. Daily guided prompts, Google sign-in, and Stripe subscriptions with a 7-day trial. The day's session stays behind an active subscription.",
            },
            {
                heading: "The AI",
                body: "A family uploads one photo. Flux repaints it into a curated world, image to image, so the portrait belongs to the product.",
            },
            {
                heading: "Stack",
                body: "React, FastAPI, MongoDB, Ory Kratos, Stripe, and Flux.",
            },
            {
                heading: "Outcome",
                body: "Family AHA is in production. I own it, and it runs on the platform below.",
            },
        ],
        shots: [
            {
                src: "/work/family-aha-home.webp",
                alt: "Family AHA homepage. The headline reads: Build your child's identity, one day at a time.",
                width: 1440,
                height: 900,
                caption: "The public site, familyaha.com.",
            },
            {
                src: "/work/family-aha-login.webp",
                alt: "Family AHA sign-in. Email and password, and a Continue with Google button.",
                width: 1440,
                height: 900,
                caption: "Sign-in, including Continue with Google.",
            },
        ],
        clip: {
            src: "/work/family-aha.webm",
            poster: "/work/family-aha-story.webp",
            label: "Short recording of the Family AHA site",
            caption: "A pass down the public site.",
        },
    },
    {
        id: "observatory",
        title: "Observatory",
        lede: "AI that runs real systems.",
        reverse: true,
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
        shots: [],
        clip: null,
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
