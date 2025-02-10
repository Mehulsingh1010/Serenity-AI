import { ModernSidebar } from '@/components/sidebar'
import React from 'react'

function layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
                <ModernSidebar />
                <main className="min-h-screen md:pl-[280px] pt-[72px] md:pt-0">
                  <div className="container mx-auto p-6 max-w-7xl">{children}</div>
                </main>
              </div>
  )
}

export default layout
