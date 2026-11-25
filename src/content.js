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

export const projects = [
    {
        title: 'Family AHA',
        lede: 'A family app whose evening is written, checked, and illustrated for that family.',
        body: 'The day comes out as a session, researched fact cards, a night story, and a letter from each kid’s animal guide. Overlaps get rewritten, Flux paints the cards, and claims are checked against real sources. Prompts are versioned, each stage is a job you can watch, and every model call is logged with its cost.',
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
            width: 800,
            height: 767,
        },
        href: 'https://familyaha.com',
        linkLabel: 'familyaha.com',
    },
    {
        title: 'Novapaxx / Observatory',
        lede: 'AI that watches a cluster and stays quiet until a person is needed.',
        body: 'Signals open a situation, and a judgment model files it in a closed playbook. Reversible fixes can run on their own. Anything else waits, because the model proposes and code decides whether a write happens.',
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
        body: 'We name who it’s for, what it has to do, and what stays out.',
    },
    {
        n: '02',
        title: 'Build',
        body: 'I design it and ship it to a real deployment, with the AI in the product.',
    },
    {
        n: '03',
        title: 'Run',
        body: 'It stays hosted and watched. You hear about it when a situation needs a person.',
    },
];
