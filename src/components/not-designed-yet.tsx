import { EmptyState, PageHeader } from "@vdm-design-team/caf";
import { Screen } from "@/components/screen";
import type { App } from "@/data/apps";

/**
 * A page that has no screen yet, so no click in the prototype goes nowhere:
 * its app's header, its title, and where its screen goes.
 */
export function NotDesignedYet({ app, title, file }: { app: App; title: string; file: string }) {
  return (
    <Screen app={app} page={title}>
      <PageHeader title={title} />
      <EmptyState title="Not designed yet" description={`${title} is still to come. Its screen goes in ${file}.`} />
    </Screen>
  );
}
