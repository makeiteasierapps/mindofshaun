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

export const heroSlot = slot({
    id: 'hero',
    aspect: '16:10',
    width: 1600,
    height: 1000,
    kind: 'still',
    chrome: 'none',
    fit: 'contain',
    src: '/work/family-aha/01-did-you-know.webp',
    alt: 'A Family AHA Did You Know card, with a Wonder card behind it.',
    back: { src: '/work/family-aha/02-wonder.webp', alt: '' },
});

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
            alt: 'Did You Know card. An illustrated baby on a stone path, beside a fact about how often new walkers fall.',
        },
        {
            src: '/work/family-aha/02-wonder.webp',
            alt: "Wonder of the World card. An illustrated grass rope bridge in a canyon, with copy about Q'eswachaka in Peru.",
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
            alt: "Daily story titled Gray's Origin: Step Off the Rock, told in the first person by a wolf named Gray.",
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

const faCheck = slot({
    id: 'fa-check',
    aspect: '16:10',
    width: 1440,
    height: 900,
    kind: 'still',
    chrome: 'none',
    fit: 'contain',
    src: '/work/family-aha/08-fact-check.webp',
    alt: 'Fact-check in the admin studio. A Did You Know sentence is marked Supported, with source passages underneath.',
    caption: 'Fact-check. Supported, with the passages it came from.',
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
    label: 'Recording of a Family AHA portrait. Dev Family stands with a dog in a painted forest clearing.',
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
    alt: 'The admin studio generating a session. Session fields is the stage in progress.',
    caption: 'The admin studio, generating a session.',
});

export const observatorySlot = slot({
    id: 'obs-dashboard',
    aspect: '16:10',
    width: 1600,
    height: 1000,
    kind: 'still',
});

export const mediaSlots = [
    heroSlot,
    faProblem,
    faWriter,
    faUnique,
    faStory,
    faArt,
    faCheck,
    faPortrait,
    faEngineering,
    observatorySlot,
];

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
        body: "A second pass writes the night's story with its own rules against repeating plots. Then each animal guide writes a letter adapted to the kid's age. Each kid's animal guide gets an AI-written reason for the match, then nightly letters in its voice.",
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

export const diagram = [
    'The model proposes',
    'Code decides',
    'A human gets paged only when needed',
];

export const observatory = {
    id: 'observatory',
    title: 'Observatory',
    lede: 'AI that runs real systems.',
    slot: observatorySlot,
    parts: [
        {
            heading: 'Problem',
            body: 'A Kubernetes cluster produces more signals than a person should watch. Page someone for every blip, and they stop reading the page.',
        },
        {
            heading: 'What I built',
            body: 'Observatory scans those signals and opens a situation. The cluster is managed through GitOps. A person is paged only when a situation needs one.',
        },
        {
            heading: 'The AI',
            body: 'A judgment model classifies each situation into a closed playbook. Reversible fixes can run on their own. Anything else waits for approval. The model proposes. Code decides whether a write happens.',
        },
        {
            heading: 'Stack',
            body: 'Kubernetes, Flux, FastAPI, MongoDB, and TypeSafe for the judgment calls. Discord is how a page goes out.',
        },
        {
            heading: 'Outcome',
            body: 'This is the system that runs Family AHA and the rest of what I host. The ordinary state is silence.',
        },
    ],
};

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

export const offers = [
    {
        title: 'AI MVP Build',
        // Bracketed price and timeline stay hidden until real values replace them.
        price: '[price]',
        timeline: '[timeline]',
        featured: true,
        included: [
            'A scope: who it\'s for, what it has to do, and what is out',
            'The product designed and shipped to a real deployment',
            'Prompts versioned, outputs checked against a schema, and every model call logged with its cost',
            'Hosting and monitoring after it ships',
        ],
    },
    {
        title: 'AI Feature Sprint',
        price: '[price]',
        timeline: '[timeline]',
        featured: false,
        included: [
            'One feature, with what is out of it written down',
            'Built into the product you already have',
            'Shipped to the deployment that product already runs on',
            'A schema check and a cost log for the model call, left in place',
        ],
    },
];
