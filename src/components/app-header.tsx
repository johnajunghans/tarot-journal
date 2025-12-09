/**
 * App Header
 * 
 * Abstracted application header with sidebar toggle, breadcrumbs, and optional action button.
 */
"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react/jsx-runtime"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

// === Types ===

interface BreadcrumbSegment {
  label: string
  href?: string
}

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbSegment[]
  actionButton?: React.ReactNode
}

// === Component ===

export function AppHeader({ breadcrumbs = [], actionButton }: AppHeaderProps) {

  const { state } = useSidebar()

  return (
    <header className="border-b bg-background/75 backdrop-blur-[3px] sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
            
          
          
          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1
                  
                  return (
                    <Fragment key={`${crumb.label}-${index}`}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : crumb.href ? (
                          <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        ) : (
                          <span>{crumb.label}</span>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
        
        {actionButton && (
          <div className="flex items-center gap-4">
            {actionButton}
          </div>
        )}
      </div>
    </header>
  )
}

