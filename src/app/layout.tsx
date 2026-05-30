import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compass — Travel your way",
  description: "Curated travel, built around you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Instrument Serif — headings */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        {/* Satoshi — body / subheadings */}
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="phone-frame">
          {children}
        </div>
      </body>
    </html>
  );
}
