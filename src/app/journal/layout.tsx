/**
 * Journal Layout
 * 
 * Layout for the journal section with sidebar, header, breadcrumbs, and contextual actions.
 */
"use client"

import { usePathname } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { NewJournalActionButton } from "@/components/new-journal-action-button"

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
  
  // Show dropdown button on all journal pages except "new" pages
  return <NewJournalActionButton />
}

// === Component ===

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const actionButton = getActionButton(pathname)
  
  return (
    <>
      <AppHeader breadcrumbs={breadcrumbs} actionButton={actionButton} />
      {children}
    </>
  )
}

