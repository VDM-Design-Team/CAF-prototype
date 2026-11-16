"use client";

/* A Client Component: the navigation labels come from the design system's
   "use client" modules, which a Server Component can render but not read. */
import Link from "next/link";
import { APP_HEADER_ADMIN_PAGES, APP_HEADER_USER_PAGES, NavLink, PageHeader } from "@vdm-design-team/caf";
import { ACCOUNTS, routeFor, type App } from "@/data/apps";

/* Each app and its pages, as its header lists them. Logout comes back here. */
const APPS: { app: App; title: string; pages: readonly string[] }[] = [
  { app: "admin", title: "Admin", pages: APP_HEADER_ADMIN_PAGES },
  { app: "user", title: "User", pages: APP_HEADER_USER_PAGES },
];

/** The prototype's front door: pick an app, then a page. */
export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-8 px-4 pt-6 pb-16 md:px-6 md:pt-8">
      <PageHeader
        title="CAF Prototype"
        description="CAF's screens, clickable, with sample data. Open the admin's app or the user's."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {APPS.map(({ app, title, pages }) => (
          <section
            key={app}
            aria-labelledby={`${app}-title`}
            className="flex flex-col gap-3 rounded-8 border border-stroke-default bg-surface-base p-6"
          >
            <div className="flex flex-col gap-1">
              <h2 id={`${app}-title`} className="text-title-md-semibold text-text-primary">
                {title}
              </h2>
              <p className="text-body-sm-regular text-text-secondary">Signed in as {ACCOUNTS[app]}.</p>
            </div>
            <nav aria-labelledby={`${app}-title`}>
              <ul className="flex flex-col">
                {pages.map((label) => (
                  <li key={label}>
                    <NavLink as={Link} href={routeFor(app, label)} orientation="vertical">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        ))}
      </div>
    </main>
  );
}
