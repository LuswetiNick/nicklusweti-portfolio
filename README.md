# Nick Lusweti Portfolio

A responsive portfolio for Nick Lusweti, a Nairobi-based software developer building end-to-end web products with React, Next.js, APIs, and data systems.

The site pairs a dark, typography-led landing page with MDX-powered project case studies and a functional contact form delivered through Resend and React Email.

## Highlights

- Hero, about, project, technical capability, and contact sections
- Floating navigation and responsive footer
- Scroll-triggered reveals with reduced-motion support
- Dynamic project routes generated from shared project metadata
- MDX case studies covering each project’s overview and challenges
- Responsive project imagery and technology summaries
- Accessible contact form with server-side validation and clear submission states
- React Email template and Resend delivery
- Honeypot spam protection and basic per-instance rate limiting

## Featured projects

| Project | Category | Links |
| --- | --- | --- |
| Studio IO | Learning platform | [Live site](https://studio-io-lms.vercel.app) · [GitHub](https://github.com/LuswetiNick/studio-io-lms) |
| Afrika Mosaics | Artist portfolio | [Live site](https://artist-portfolio-dusky.vercel.app) · [GitHub](https://github.com/LuswetiNick/artist-portfolio) |
| Resonix | AI audio platform | [Live site](https://resonix-sooty.vercel.app) · [GitHub](https://github.com/LuswetiNick/resonix) |

## Built with

- [Next.js 16](https://nextjs.org/) and the App Router
- [React 19](https://react.dev/) and TypeScript
- [MDX](https://mdxjs.com/) for project narratives
- CSS Modules for component styling
- [Motion](https://motion.dev/) for interface animation
- [Lucide](https://lucide.dev/) for interface icons
- [Resend](https://resend.com/) and [React Email](https://react.email/) for contact-form delivery

## Getting started

### Prerequisites

- Node.js 24 or newer
- pnpm 11 or newer

### Installation

```bash
git clone https://github.com/LuswetiNick/nicklusweti-portfolio.git
cd nicklusweti-portfolio
pnpm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Add your Resend configuration to `.env.local`, then start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Authenticates contact-form requests with Resend. |
| `RESEND_FROM_EMAIL` | Recommended | Sender identity used for portfolio messages. Use a verified Resend domain in production. |
| `CONTACT_EMAIL` | Recommended | Inbox that receives contact-form submissions. |

For local Resend testing, `onboarding@resend.dev` can be used as the sender. Production delivery should use an address on a verified domain.

Never commit `.env.local` or expose the Resend API key to client-side code.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the local development server. |
| `pnpm build` | Creates a production build. |
| `pnpm start` | Runs the production server after a build. |
| `pnpm lint` | Runs ESLint across the project. |

## Project structure

```text
app/
  actions/contact.tsx       Contact server action and Resend delivery
  projects/[slug]/          Dynamic project case-study route
components/                 Landing-page sections and shared UI
content/projects/           MDX project narratives
emails/contact-message.tsx  React Email contact template
lib/projects.ts             Project metadata and route helpers
public/projects/            Project imagery
```

Project metadata lives in `lib/projects.ts`, while the long-form overview and challenge content for each project lives in `content/projects/<slug>.mdx`. A project slug must match across those two locations.

## Contact form notes

The contact form validates all fields on the server, renders both HTML and plain-text email content, and sets the visitor’s address as the reply-to value. The included rate limiter stores request counts in application memory, so production deployments with multiple instances should replace it with a shared data store if stricter abuse prevention is required.

## Deployment

The application can be deployed to any platform that supports Next.js server actions. Configure the three environment variables in the hosting provider, verify the sender domain in Resend, and run `pnpm build` as part of the deployment.
