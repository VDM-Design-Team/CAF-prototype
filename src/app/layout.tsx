import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@vdm-design-team/caf";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAF Prototype",
  description: "The shared clickable prototype of CAF, built from the CAF Design System.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* next-themes sets `.dark` on <html> before React hydrates, which is what
       CAF's dark tokens hang off. */
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Once, near the root, so a toast survives the move to the next screen. */}
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
