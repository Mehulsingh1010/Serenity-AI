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
  title: "Your App Name",
  description: "Description of your app",
}

function RootLayoutContent({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <Provider>
          <div className="min-h-screen bg-background flex">
            <ModernSidebar />
            <main
              className="
                min-h-screen 
                transition-all 
                duration-300 
                pt-20 
                md:pt-8 
                px-4 
                md:px-8
                flex-1 
                md:ml-64
              "
            >
              <div className="max-w-7xl mx-auto px-4 md:px-4 transition-all duration-300">{children}</div>
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

