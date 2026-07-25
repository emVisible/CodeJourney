import type { Metadata } from "next";
import "github-markdown-css";
import "@/app/assets/global.css";
import "@fontsource/roboto/500.css";

export const metadata: Metadata = {
  title: {
    default: "MCP.ink - Discover MCP Servers",
    template: "%s | MCP.ink",
  },
  description:
    "Production-ready and experimental MCP Servers that extend AI capabilities through file access, database connections, API integrations, and other contextual services.",
  keywords: [
    "MCP",
    "MCP Navigation",
    "ModelContextProtocol",
    "AI servers",
    "API integration",
    "database connections",
    "AI capabilities",
  ],
  // metadataBase: new URL("https://mcp.ink"),
  publisher: "Deamgo Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f8f8f8] ">
        <div className="min-w-sm mx-6 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-44 2xl:mx-80">
          {children}
        </div>
      </body>
    </html>
  );
}
