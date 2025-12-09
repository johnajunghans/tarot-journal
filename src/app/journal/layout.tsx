/**
 * Journal Layout
 * 
 * Layout for the journal section with sidebar, header, breadcrumbs, and contextual actions.
 */
"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"

// === Helpers ===

interface BreadcrumbSegment {
  label: string
  href?: string
}

function getBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbSegment[] = []
  
  // Always start with Journal
  breadcrumbs.push({ label: "Journal", href: "/journal" })
  
  if (segments.length === 1) {
    // Just /journal
    return breadcrumbs
  }
  
  // Add section (readings, spreads, insights)
  if (segments[1]) {
    const section = segments[1]
    const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1)
    breadcrumbs.push({ label: sectionLabel, href: `/journal/${section}` })
    
    // Add subsection if present
    if (segments[2]) {
      if (segments[2] === 'new') {
        breadcrumbs.push({ label: `New ${sectionLabel.slice(0, -1)}` })
      } else {
        // It's an ID, show generic label
        const singular = sectionLabel.slice(0, -1) // Remove trailing 's'
        breadcrumbs.push({ label: `${singular} Detail` })
      }
    }
  }
  
  return breadcrumbs
}

function getActionButton(pathname: string): React.ReactNode | null {
  // Don't show action button on "new" pages
  if (pathname.includes('/new')) {
    return null
  }
  
  // Determine which action to show based on current section
  if (pathname.startsWith('/journal/readings')) {
    return (
      <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity text-white">
        <Link href="/journal/readings/new">
          <Plus className="w-4 h-4" /> New Reading
        </Link>
      </Button>
    )
  }
  
  if (pathname.startsWith('/journal/spreads')) {
    return (
      <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity text-white">
        <Link href="/journal/spreads/new">
          <Plus className="w-4 h-4" /> New Spread
        </Link>
      </Button>
    )
  }
  
  if (pathname.startsWith('/journal/insights')) {
    return (
      <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity text-white">
        <Link href="/journal/insights/new">
          <Plus className="w-4 h-4" /> New Insight
        </Link>
      </Button>
    )
  }
  
  return null
}

// === Component ===

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const actionButton = getActionButton(pathname)
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-auto max-h-screen ml-0! md:max-h-[calc(100vh-1rem)]">
        <AppHeader breadcrumbs={breadcrumbs} actionButton={actionButton} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

