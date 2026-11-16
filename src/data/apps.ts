/**
 * CAF's two apps, as the CAF Design file draws them: the admin's (Navigation /
 * Header – Admin, ten links) and the user's (Header – User, five links).
 * Every page is a route under its app: /admin/cost-centers, /user/drafts.
 */
export type App = "admin" | "user";

/** A navigation label as a route segment: "Cost Centers" → "cost-centers". */
export const slug = (label: string) => label.toLowerCase().replace(/ /g, "-");

/** The route of an app's page, by its navigation label. */
export const routeFor = (app: App, label: string) => `/${app}/${slug(label)}`;

/** Who is signed in to each app: the sample accounts the screens show. */
export const ACCOUNTS: Record<App, string> = { admin: "Admin Account", user: "QA Test" };
