/**
 * App Sidebar
 * 
 * Main navigation sidebar with collapsible icon-only mode.
 * Features animated text that scales in/out with 150ms transitions.
 */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, LayoutGrid, Sparkles, Vault } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// === Types ===

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

// === Constants ===

const navItems: NavItem[] = [
  {
    title: "Readings",
    href: "/readings",
    icon: BookOpen,
  },
  {
    title: "Spreads",
    href: "/spreads",
    icon: LayoutGrid,
  },
  {
    title: "Interpretations",
    href: "/interpretations",
    icon: Sparkles,
  },
]

// === Component ===

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600">
            <Vault className="size-4 text-white" />
          </div>
          <div 
            className="flex flex-col overflow-hidden transition-all duration-150 ease-in-out origin-left"
            style={{
              transform: isCollapsed ? 'scaleX(0)' : 'scaleX(1)',
              width: isCollapsed ? '0' : 'auto',
              opacity: isCollapsed ? 0 : 1,
            }}
          >
            <h2 className="text-lg font-semibold whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Tarot Vault
            </h2>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="ml-2">
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href} className="flex items-center">
                        <Icon className="size-4 shrink-0" />
                        <span 
                          className="transition-all duration-150 ease-in-out origin-left overflow-hidden whitespace-nowrap"
                          style={{
                            transform: isCollapsed ? 'scaleX(0)' : 'scaleX(1)',
                            width: isCollapsed ? '0' : 'auto',
                            opacity: isCollapsed ? 0 : 1,
                          }}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

