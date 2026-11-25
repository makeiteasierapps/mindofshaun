/** Every "Book a call" control uses this Zoho Calendar booking page. */
export const BOOKING_URL =
    'https://calendar.zoho.com/zc/view/slot-booking/0801123c9bb09de875eb7b8f61644dfc000020310e582af6ee9f62577a4582a3dfb614cb5fc7d62d911772a26e0e34f2aa3fa28ff39c2bc7484069552542ce8e';

export const email = 'shaun@novapaxx.com';

export const profiles = [
    {
        label: 'GitHub',
        href: 'https://github.com/makeiteasierapps',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/shaun-o-940b591b5/',
    },
    {
        label: 'X (@makeiteasier_)',
        href: 'https://x.com/makeiteasier_',
    },
];

function slot(spec) {
    return {
        src: null,
        poster: null,
        src2x: null,
        alt: '',
        caption: '',
        label: '',
        ...spec,
        width2x: spec.width * 2,
        height2x: spec.height * 2,
    };
}

// No src yet, so the sticky band folds this copy into the next step that has
// one. Set src, alt, and caption and the step comes back as its own frame.
const faProblem = slot({
    id: 'fa-problem',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'still',
    chrome: 'none',
    fit: 'contain',
});

const faWriter = slot({
    id: 'fa-writer',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'collage',
    layout: 'strip-3',
    chrome: 'none',
    fit: 'contain',
    caption: 'The session, then Did You Know and Wonder.',
    images: [
        {
            src: '/work/family-aha/12-stage-panel.webp',
            alt: 'A finished session: fields, daily story, guide letters, and session art marked done.',
        },
        {
            src: '/work/family-aha/01-did-you-know.webp',
            alt: 'Did You Know card. Illustrated macaques on a beach; a fact about Imo on Koshima in 1953 washing sweet potatoes. The last lines of the fact are clipped.',
        },
        {
            src: '/work/family-aha/02-wonder.webp',
            alt: 'Wonder of the World card. Illustrated rocky island in rough sea; copy about the 1963 birth of Surtsey off Iceland. The last lines are clipped.',
        },
    ],
});

// Same as fa-problem: add a src and this frame returns to the band.
const faUnique = slot({
    id: 'fa-unique',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'still',
    chrome: 'none',
    fit: 'contain',
});

const faStory = slot({
    id: 'fa-story',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'collage',
    layout: 'stack',
    chrome: 'none',
    fit: 'contain',
    caption: "The night's story, with the guide's letter behind it.",
    images: [
        {
            src: '/work/family-aha/04-daily-story.webp',
            alt: 'Daily story titled Where Would the Door Be?, told in the first person by Merlin the monkey, about a mouse named Tamsin.',
        },
        {
            src: '/work/family-aha/05-guide-letter.webp',
            alt: "A letter from Sam's guide, Forest, titled The One Who Owns It, with a challenge for the week.",
        },
    ],
});

const faArt = slot({
    id: 'fa-art',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'collage',
    layout: 'grid',
    chrome: 'none',
    fit: 'contain',
    caption: "Wordless illustrations for the day's cards.",
    images: [
        {
            src: '/work/family-aha/art/1-embodiment-did-you-know.webp',
            alt: 'Wordless illustration for an Embodiment Did You Know card.',
        },
        {
            src: '/work/family-aha/art/1-embodiment-wonder.webp',
            alt: 'Wordless illustration for an Embodiment Wonder card.',
        },
        {
            src: '/work/family-aha/art/1-faith-did-you-know.webp',
            alt: 'Wordless illustration for a Faith Did You Know card.',
        },
        {
            src: '/work/family-aha/art/1-love-wonder.webp',
            alt: 'Wordless illustration for a Love Wonder card.',
        },
        {
            src: '/work/family-aha/art/1-forgiveness-wonder.webp',
            alt: 'Wordless illustration for a Forgiveness Wonder card.',
        },
        {
            src: '/work/family-aha/art/1-spirituality-did-you-know.webp',
            alt: 'Wordless illustration for a Spirituality Did You Know card.',
        },
    ],
});

// No src until a replacement still exists, so the sticky band folds this copy
// into the next step that has one. Set src, alt, and caption and the frame returns.
const faCheck = slot({
    id: 'fa-check',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'still',
    chrome: 'none',
    fit: 'contain',
});

// Hold the frame until a new portrait clip replaces the placeholder.
const faPortrait = slot({
    id: 'fa-portrait',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'video',
    chrome: 'none',
    fit: 'contain',
    hold: true,
    alt: 'Dev Family stands with a dog in a painted forest clearing.',
    label: 'Family portrait, coming soon',
    caption: 'The family portrait, repainted into one world.',
});

const faEngineering = slot({
    id: 'fa-engineering',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'still',
    chrome: 'none',
    fit: 'contain',
    src: '/work/family-aha/07-admin-generate.webp',
    alt: 'The admin studio Generate sessions dialog. Session fields, daily story, and save draft are done (story title The Gate on the Hill). Guide letters is in progress, 1 of 18, Cal. Session art has not started.',
    caption: 'The admin studio, generating a session.',
});

const pipeline = [
    {
        slot: faWriter,
        blocks: [
            {
                heading: 'Session writer',
                body: "Claude writes each day's session as validated structured output. Earlier sessions go in as lines it isn't allowed to reuse.",
            },
            {
                heading: 'Grounded fact cards',
                body: "Did You Know and Wonder aren't free-written. The model proposes what to research, the pipeline pulls real sources, and the cards are written from those passages. A ledger blocks reusing a fact.",
            },
        ],
    },
    {
        lead: 'Uniqueness checks',
        body: 'A faster Claude model compares each session to past ones and rewrites only the parts that overlap.',
        slot: faUnique,
    },
    {
        lead: 'Daily story and guide letters',
        body: "A second pass writes the night's story with its own rules against repeating plots. Each kid's animal guide gets an AI-written reason for the match, then writes letters in that voice, adapted to the kid's age.",
        slot: faStory,
    },
    {
        lead: 'Session art',
        body: 'An LLM turns each finished card into an image prompt, and Flux 2 Pro paints a wordless illustration for it.',
        slot: faArt,
    },
    {
        lead: 'Fact-check and repair',
        body: 'Claims are searched across Wikipedia, OpenAlex, and Tavily, then judged as supported, unsupported, or contradicted. A bad sentence can be swapped for another fact from the same sources.',
        slot: faCheck,
    },
    {
        lead: 'Family portraits',
        body: "One uploaded photo gets repainted into a curated world. A vision model checks that the same people came back and repaints once if they didn't.",
        slot: faPortrait,
    },
];

export const familyStudy = {
    id: 'family-aha',
    title: 'Family AHA',
    lede: 'A production family app whose daily ritual is written, fact-checked, illustrated, and personalized by a multi-stage AI pipeline.',
    live: { href: 'https://familyaha.com', label: 'Visit Family AHA' },
    steps: [
        {
            id: 'problem',
            heading: 'Problem',
            body: "Families need a short evening ritual they'll actually repeat. Generic AI copy goes stale, repeats itself, and can't be trusted with facts a kid might remember. It also has to feel like it belongs to this family, not a template.",
            slot: faProblem,
        },
        ...pipeline.map((item) =>
            item.blocks
                ? { id: item.slot.id, slot: item.slot, blocks: item.blocks }
                : {
                      id: item.slot.id,
                      heading: item.lead,
                      body: item.body,
                      slot: item.slot,
                  },
        ),
        {
            id: 'engineering',
            slot: faEngineering,
            blocks: [
                {
                    heading: 'Engineering',
                    body: 'Every prompt is versioned in an admin studio. Generation runs as async jobs with progress for each stage, outputs are checked against a schema, and every provider call is logged with its cost.',
                },
                {
                    heading: 'Stack',
                    body: 'React, Tailwind, shadcn/ui, FastAPI, MongoDB, Ory Kratos, Stripe, Claude (Opus, Sonnet, Haiku), OpenAI, Flux 2 Pro, Tavily, TypeSafe Jev.',
                },
                {
                    heading: 'Outcome',
                    body: 'Live at familyaha.com, $8.88/month with a 7-day trial. I own it, and it runs on my own platform.',
                },
            ],
        },
    ],
};

export const projects = [
    {
        title: 'Family AHA',
        lede: 'A production family app whose daily ritual is written, fact-checked, illustrated, and personalized by a multi-stage AI pipeline.',
        body: "Families need a short evening ritual they'll actually repeat, and generic AI copy goes stale, repeats itself, and can't be trusted with a fact a kid might remember. The app writes each day's session as structured output, researches Did You Know and Wonder from real sources, then writes the night's story and a letter from each kid's animal guide. A faster model rewrites anything that overlaps a past session, Flux paints a wordless illustration for each card, and claims are checked against Wikipedia, OpenAlex, and Tavily. Prompts stay versioned, each stage runs as a job you can watch, and every model call is logged with its cost.",
        stack: [
            'React',
            'Tailwind',
            'shadcn/ui',
            'FastAPI',
            'MongoDB',
            'Ory Kratos',
            'Stripe',
            'Claude',
            'OpenAI',
            'Flux',
            'Tavily',
            'TypeSafe',
        ],
        image: {
            src: '/work/family-aha/05-guide-letter.webp',
            alt: "A letter from Sam's guide, Forest, titled The One Who Owns It, with a challenge for the week.",
        },
        href: 'https://familyaha.com',
        linkLabel: 'familyaha.com',
    },
    {
        title: 'Novapaxx / Observatory',
        lede: 'AI that watches a cluster and stays quiet until a person is needed.',
        body: 'A Kubernetes cluster produces more signals than a person should watch, and a page for every blip is a page nobody reads. Observatory opens a situation from those signals, and a judgment model classifies it into a closed playbook. Reversible fixes can run on their own. Anything else waits for a person, because the model proposes and code decides whether a write happens.',
        stack: ['Kubernetes', 'Flux', 'FastAPI', 'MongoDB', 'TypeSafe', 'Discord'],
    },
    {
        title: 'Hosting platform',
        lede: 'Apps ship from a template onto a cluster I run.',
        body: 'An app starts from a template, publishes an image to GHCR, and rolls out through Flux onto the Kubernetes cluster. Family AHA runs there, and so does the rest of what I host.',
        stack: ['Flux', 'Kubernetes', 'GitOps', 'GHCR'],
    },
];

export const steps = [
    {
        n: '01',
        title: 'Scope',
        body: "We name who it's for, what it has to do, and what is out of the engagement.",
    },
    {
        n: '02',
        title: 'Build',
        body: 'I design it and ship it to a real deployment. The AI is part of the product.',
    },
    {
        n: '03',
        title: 'Run',
        body: 'It stays hosted and watched. You hear about it when a situation needs a person.',
    },
];
