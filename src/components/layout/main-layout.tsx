/**
 * Main Layout
 * 
 * Root layout component that wraps the entire application with sidebar and header.
 */
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="overflow-auto max-h-screen ml-0! md:max-h-[calc(100vh-1rem)]">
        <AppHeader />
          {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

