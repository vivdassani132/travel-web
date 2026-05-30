import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wandr — Travel your way",
  description: "AI-curated travel, built around you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="phone-frame">
          {children}
        </div>
      </body>
    </html>
  );
}
