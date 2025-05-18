import { Geist, Azeret_Mono as Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

// Font imports with CSS variables

// Metadata for SEO/social
export const metadata = {
  title: "SerenityAI +",
  description: "Your personal AI-powered journaling companion",
  icons: {
    icon: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    title: "SerenityAI +",
    description: "Your personal AI-powered journaling companion",
    url: "https://serenity-ai-seven.vercel.app/",
    siteName: "SerenityAI +",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "SerenityAI Preview Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SerenityAI +",
    description: "Your personal AI-powered journaling companion",
    site: "@your_twitter_handle",
    images: ["/logo1.png"],
  },
  themeColor: "#ffffff",
};

// Component: Root layout
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background font-handwriting"
      >
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

// Component: Clerk wrapper
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </ClerkProvider>
  );
}
