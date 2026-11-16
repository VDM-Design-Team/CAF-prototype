import { NotDesignedYet } from "@/components/not-designed-yet";

/* The user's pages with no screen yet: the five links of Header – User, and
   the account menu's Settings and Manage Currencies. When one is designed,
   give it its own folder (src/app/user/<page>/) and take it off this list. */
const NOT_DESIGNED_YET: Record<string, string> = {
  costs: "Costs",
  "create-cost": "Create Cost",
  "bulk-upload": "Bulk Upload",
  "recurring-costs": "Recurring Costs",
  drafts: "Drafts",
  settings: "Settings",
  "manage-currencies": "Manage Currencies",
};

/* The static export builds exactly these; any other path is a 404. */
export function generateStaticParams() {
  return Object.keys(NOT_DESIGNED_YET).map((page) => ({ page }));
}

export default async function UserPage({ params }: PageProps<"/user/[page]">) {
  const { page } = await params;
  return <NotDesignedYet app="user" title={NOT_DESIGNED_YET[page]} file={`src/app/user/${page}/page.tsx`} />;
}
