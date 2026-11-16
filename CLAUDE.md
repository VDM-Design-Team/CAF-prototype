# CAF Prototype

The team's **shared clickable prototype** of CAF: one screen per route, built
only from the CAF Design System package (`@vdm-design-team/caf`) with sample
data. Designers build screens here; the dev team builds the real app from
them. `main` is the prototype everyone clicks through.

The screens come from the **CAF Design file** in Figma
(`z7L8r4nq6nL6Yfa8vvxJhO`: Admin screens `2102:4`, User Screens `2102:3`).
The components come from the CAF Figma library through the package.

@AGENTS.md

## Rules — apply to every change

1. **Build only from the design system.** Every control, tag, table, modal,
   filter bar and header comes from `@vdm-design-team/caf`. Before writing
   any UI, read the piece in the package's own docs:
   `node_modules/@vdm-design-team/caf/README.md` ("Components": what each
   one is, its props and Figma names) and
   `node_modules/@vdm-design-team/caf/docs/patterns.md` (how CAF's
   components are used together: patterns 01–16 and the page templates).
   Use only props the package documents. Never copy a component's code into
   this repo.
2. **Start from the design system's templates.** The design system's
   Storybook already lays out many of CAF's pages (Templates and Patterns:
   Admin / Costs, Drafts, Cost Centers, Contacts, …). Those page
   compositions are stories, not exports: a screen here rebuilds the page
   from the exported components, in the same order and words.
3. **Something missing is a design-system request, not a local component.**
   If a screen needs a section or control the package doesn't have, and it
   would appear on more than one screen, stop and say so: it belongs in the
   design-system repo (VDM-Design-Team/CAF-design-system) as a PR, and in the
   CAF Figma library first. Local pieces in `src/components/` are only for
   layout that one screen needs.
4. **Tokens only.** No hex, no px, no arbitrary Tailwind values
   (`bg-[#2563eb]`, `p-[13px]`). Colours: `bg-surface-*` (`bg-surface-canvas`,
   `bg-surface-base`, `bg-surface-elevated`), `text-text-*` (`text-text-primary`,
   `text-text-secondary`, `text-text-subtle`), `border-stroke-*`
   (`border-stroke-default`), and the `action-*` / `accent-*` families.
   Spacing: GDL's scale through Tailwind's numbers (`p-1` = 4px, `p-4` = 16px,
   `gap-6` = 24px). Type: `text-{tier}-{size}-{weight}` (`text-body-md-regular`,
   `text-title-md-semibold`, `text-heading-xl-bold`). Radius `rounded-8`,
   shadows `shadow-elevation-*`.
5. **Light and dark.** Every screen must work in both; the header's theme
   toggle flips them. Tokens make that free — a hardcoded colour breaks it.
6. **Accessible.** One `<h1>` per screen (PageHeader's title), headings in
   order, labels on icon-only controls, nothing that only works with a mouse.

## How the app is laid out

- `/` is the front page: the two apps and their pages. Logout comes back
  here.
- `src/app/<app>/<page>/page.tsx` is one screen per route. `<app>` is `admin`
  or `user`; `<page>` is the navigation label in kebab case (`cost-centers`,
  `recurring-costs`, `create-cost`). Settings and Manage Currencies, from the
  account menu, are `settings` and `manage-currencies`.
- Every screen renders `<Screen app="admin" page="Cost Centers">` from
  `src/components/screen.tsx`: CAF's `AppHeader` for that app (the Mobile
  Header and Mobile Menu below 768px) over the page container. Leave `page`
  out for a page outside the navigation (Settings).
- `src/app/<app>/[page]/page.tsx` lists that app's pages not designed yet.
  When you build one, give it its own folder and take it off that list.
- Sample data lives in the screen's file, or in `src/data/` once more than
  one screen shares it. No real customer data, ever.

## It's a static site

`next build` writes plain files to `out/` (`output: "export"`), which
Cloudflare Pages serves. So no Server Actions, cookies, route handlers,
redirects or rewrites, and a dynamic route needs `generateStaticParams`.
Interactivity is client state (`"use client"`).

The design system's components are all `"use client"`, so a Server
Component can render them, but it can't *read* a value from the package
(`APP_HEADER_ADMIN_PAGES`, `cn`). Use those in a Client Component.

## Workflow

- One branch per screen or change (`screen/cost-centers`, `fix/…`), from a
  freshly pulled `origin/main`. Never push to `main`.
- Open a PR. CI builds it and deploys a **preview link** for that branch;
  review the screen there, then merge.
- Bring `main` into a branch with merge, not rebase. Never force-push.
- Before committing, list the changed files and check they're the task's.
- `npm run lint` and `npm run build` must pass (CI runs both).
- New design-system version: `npm i @vdm-design-team/caf@latest` in its own
  PR, and click through every screen on the preview.

## Commands

| | |
|---|---|
| `npm run dev` | The prototype at http://localhost:3000 |
| `npm run build` | The static site in `out/` (what Cloudflare serves) |
| `npm run lint` | ESLint |
