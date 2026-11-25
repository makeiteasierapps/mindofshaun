# Shaun

I'm Shaun Offenbacher. I live in Salt Lake City, and I snowboard whenever there's snow.

Novapaxx is my company in Utah. I build AI-powered apps for founders and small teams, and the systems that run them. I want them to actually ship.

Public email: shaun@novapaxx.com

- GitHub: https://github.com/makeiteasierapps
- LinkedIn: https://www.linkedin.com/in/shaun-o-940b591b5/
- X (@makeiteasier_): https://x.com/makeiteasier_

# What I take on

AI-powered apps for founders and small teams who want an AI product built and shipped. We name who it's for, what it has to do, and what is out of the engagement. I design it and ship it to a real deployment. The AI is part of the product. It stays hosted and watched on a platform I built. You hear about it when a situation needs a person.

# Process

1. Scope. We name who it's for, what it has to do, and what is out of the engagement.
2. Build. I design it and ship it to a real deployment. The AI is part of the product.
3. Run. It stays hosted and watched. You hear about it when a situation needs a person.

# Projects

## Family AHA

A production family app whose daily ritual is written, fact-checked, illustrated, and personalized by a multi-stage AI pipeline. Live at https://familyaha.com. $8.88/month with a 7-day trial. I own it, and it runs on my own platform.

Families need a short evening ritual they'll actually repeat. Generic AI copy goes stale, repeats itself, and can't be trusted with facts a kid might remember. It also has to feel like it belongs to this family, not a template.

The app writes each day's session as structured output, researches Did You Know and Wonder from real sources, then writes the night's story and a letter from each kid's animal guide. A faster model rewrites anything that overlaps a past session, Flux paints a wordless illustration for each card, and claims are checked against Wikipedia, OpenAlex, and Tavily. Prompts stay versioned, each stage runs as a job you can watch, and every model call is logged with its cost.

- Session writer. Claude writes each day's session as validated structured output. Earlier sessions go in as lines it isn't allowed to reuse.
- Grounded fact cards. Did You Know and Wonder aren't free-written. The model proposes what to research, the pipeline pulls real sources, and the cards are written from those passages. A ledger blocks reusing a fact.
- Uniqueness checks. A faster Claude model compares each session to past ones and rewrites only the parts that overlap.
- Daily story and guide letters. A second pass writes the night's story with its own rules against repeating plots. Each kid's animal guide gets an AI-written reason for the match, then writes letters in that voice, adapted to the kid's age.
- Session art. An LLM turns each finished card into an image prompt, and Flux 2 Pro paints a wordless illustration for it.
- Fact-check and repair. Claims are searched across Wikipedia, OpenAlex, and Tavily, then judged as supported, unsupported, or contradicted. A bad sentence can be swapped for another fact from the same sources.
- Family portraits. One uploaded photo gets repainted into a curated world. A vision model checks that the same people came back and repaints once if they didn't.
- Engineering. Every prompt is versioned in an admin studio. Generation runs as async jobs with progress for each stage, outputs are checked against a schema, and every provider call is logged with its cost.

Stack: React, Tailwind, shadcn/ui, FastAPI, MongoDB, Ory Kratos, Stripe, Claude (Opus, Sonnet, Haiku), OpenAI, Flux 2 Pro, Tavily, TypeSafe Jev.

## Novapaxx / Observatory

AI that watches a cluster and stays quiet until a person is needed.

A Kubernetes cluster produces more signals than a person should watch, and a page for every blip is a page nobody reads. Observatory opens a situation from those signals, and a judgment model classifies it into a closed playbook. Reversible fixes can run on their own. Anything else waits for a person, because the model proposes and code decides whether a write happens.

Stack: Kubernetes, Flux, FastAPI, MongoDB, TypeSafe, Discord.

## Hosting platform

Apps ship from a template onto a cluster I run.

An app starts from a template, publishes an image to GHCR, and rolls out through Flux onto the Kubernetes cluster. Family AHA runs there, and so does the rest of what I host.

Stack: Flux, Kubernetes, GitOps, GHCR.

# Skills

Technologies in the work above, not a separate resume: React, Tailwind, shadcn/ui, FastAPI, MongoDB, Ory Kratos, Stripe, Claude (Opus, Sonnet, Haiku), OpenAI, Flux, Flux 2 Pro, Tavily, TypeSafe, TypeSafe Jev, Kubernetes, GitOps, GHCR, Discord.

# PLACEHOLDER, Shaun will refine

- Scoping session: $500 flat, credited toward the build.
- AI feature sprint: from $4,000 (~2 weeks).
- AI MVP build: $12,000-25,000 (~4-8 weeks).
- Run & maintain: from $750/month.

Final pricing is set on a call.

# Availability

See open times on my booking page: https://calendar.zoho.com/zc/view/slot-booking/0801123c9bb09de875eb7b8f61644dfc000020310e582af6ee9f62577a4582a3dfb614cb5fc7d62d911772a26e0e34f2aa3fa28ff39c2bc7484069552542ce8e
