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
}

function RootLayoutContent({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <Provider>
          <div className="min-h-screen bg-background">
            <ModernSidebar />
            <main className="min-h-screen md:pl-[280px] pt-[72px] md:pt-0">
              <div className="container mx-auto p-6 max-w-7xl">{children}</div>
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

