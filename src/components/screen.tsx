"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AppHeader, APP_HEADER_ADMIN_PAGES, APP_HEADER_USER_PAGES, NavLink } from "@vdm-design-team/caf";
import { ACCOUNTS, routeFor, type App } from "@/data/apps";

/** Each app's navigation, in Figma's order and words, each link to its route. */
const LINKS = {
  admin: APP_HEADER_ADMIN_PAGES.map((label) => ({ label, href: routeFor("admin", label) })),
  user: APP_HEADER_USER_PAGES.map((label) => ({ label, href: routeFor("user", label) })),
};

/* The theme is only known in the browser, so the server renders the toggle as light. */
const useMounted = () =>
  React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

/**
 * Every screen sits in this: CAF's AppHeader for its app (Header – Admin or
 * Header – User; the Mobile Header and Mobile Menu below 768px) over one
 * `<main>`, laid out as the CAF Design file's Content frame (32 above the
 * page, 24 between its parts, in the header's centred container). `page` is
 * the navigation label that is current; leave it out for a page outside the
 * navigation (Settings).
 */
export function Screen({ app, page, children }: { app: App; page?: string; children: React.ReactNode }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        links={LINKS[app]}
        page={page}
        username={ACCOUNTS[app]}
        theme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
        onThemeChange={setTheme}
        onAccountSelect={(item) => {
          if (item === "settings") router.push(`/${app}/settings`);
          if (item === "manage-currencies") router.push(`/${app}/manage-currencies`);
          if (item === "logout") router.push("/");
        }}
        renderLink={(props) => <NavLink {...props} as={Link} />}
      />
      <main className="flex-1 px-4 pt-6 pb-16 md:px-6 md:pt-8">
        <div className="container mx-auto flex flex-col gap-6">{children}</div>
      </main>
    </div>
  );
}
