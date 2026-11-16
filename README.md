# CAF Prototype

The team's shared clickable prototype of CAF. Every screen is a page here,
built from the [CAF Design System](https://github.com/VDM-Design-Team/CAF-design-system)
package (`@vdm-design-team/caf`) with sample data, so it looks and behaves
like the real app will. Designers build and change screens; the dev team
builds the product from them. `main` is the prototype; every pull request
gets its own preview link.

CAF has two apps, and the prototype has both: the **admin's** (`/admin/…`,
the ten links of Header – Admin) and the **user's** (`/user/…`, the five
links of Header – User). The front page opens either one.

The rules for building screens are in [`CLAUDE.md`](CLAUDE.md). The short
version: use only the design system's components and tokens, and if a screen
needs something the design system doesn't have, ask for it there.

## Running it

Once per machine, log npm in to GitHub Packages (where the design system is
published). Username: your GitHub username. Password: a
[classic token with `read:packages`](https://github.com/settings/tokens/new?scopes=read:packages&description=npm%20GitHub%20Packages).

```bash
npm login --scope=@vdm-design-team --auth-type=legacy --registry=https://npm.pkg.github.com
```

Then:

```bash
npm install
npm run dev
```

and open http://localhost:3000. Or, in Claude, ask for the screen you want
and let it run the app for you.

## Adding a screen

1. Branch from a freshly pulled `main`: `screen/<name>`.
2. Create `src/app/<app>/<page>/page.tsx` (`<app>` is `admin` or `user`,
   `<page>` the link's label in kebab case, e.g. `cost-centers`) and wrap it
   in `<Screen app="admin" page="Cost Centers">`. Take the page off the
   "not designed yet" list in `src/app/<app>/[page]/page.tsx`.
3. Open a pull request. CI builds it and posts a preview link in the run's
   summary; check the screen there in light and dark, then merge.

## Hosting

Cloudflare Pages, project `caf-prototype`, behind Cloudflare Access so only
the team can open it. `main` deploys to the production URL; every other branch
to its own preview URL. CI does the deploying (`.github/workflows/ci.yml`).
Until the Cloudflare secrets are set, CI only lints and builds.
