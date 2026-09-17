import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeRegistry } from "@/components/ThemeRegistry";

export const metadata: Metadata = {
  title: "webshow",
  description: "A Netflix-style movie catalogue",
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <SiteHeader />
          {children}
          {modal}
        </ThemeRegistry>
      </body>
    </html>
  );
}
