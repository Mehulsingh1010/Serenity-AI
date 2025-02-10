import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Provider from "./provider"
import { ModernSidebar } from "@/components/sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "SerenityAI +",
  description: "Your personal AI-powered journaling companion",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SerenityAI +",
    description: "Your personal AI-powered journaling companion",
    url: "https://serenity-ai-seven.vercel.app/",
    siteName: "SerenityAI +",
    images: [
      {
        url: "/preview.png",
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
    images: ["/preview.png"],
  },
  themeColor: "#ffffff",
  
};

function RootLayoutContent({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <Provider>
          <div className="min-h-screen bg-background">
            {/* <ModernSidebar /> */}
            <main >
              <div >{children}</div>
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </ClerkProvider>
  )
}

