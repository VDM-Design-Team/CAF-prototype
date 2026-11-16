import { NotDesignedYet } from "@/components/not-designed-yet";

/* The admin's pages with no screen yet: the ten links of Header – Admin, and
   the account menu's Settings and Manage Currencies. When one is designed,
   give it its own folder (src/app/admin/<page>/) and take it off this list. */
const NOT_DESIGNED_YET: Record<string, string> = {
  costs: "Costs",
  "bulk-upload": "Bulk Upload",
  "cost-centers": "Cost Centers",
  partners: "Partners",
  contacts: "Contacts",
  users: "Users",
  "recurring-costs": "Recurring Costs",
  announcements: "Announcements",
  exports: "Exports",
  drafts: "Drafts",
  settings: "Settings",
  "manage-currencies": "Manage Currencies",
};

/* The static export builds exactly these; any other path is a 404. */
export function generateStaticParams() {
  return Object.keys(NOT_DESIGNED_YET).map((page) => ({ page }));
}

export default async function AdminPage({ params }: PageProps<"/admin/[page]">) {
  const { page } = await params;
  return <NotDesignedYet app="admin" title={NOT_DESIGNED_YET[page]} file={`src/app/admin/${page}/page.tsx`} />;
}
