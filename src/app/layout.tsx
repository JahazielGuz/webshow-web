import type { Metadata } from "next";
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
          {children}
          {modal}
        </ThemeRegistry>
      </body>
    </html>
  );
}
