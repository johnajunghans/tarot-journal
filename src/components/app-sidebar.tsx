/**
 * App Sidebar
 * 
 * Main navigation sidebar with collapsible icon-only mode.
 * Features animated text that scales in/out with 150ms transitions.
 */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, GalleryHorizontalEnd, Lightbulb, Vault, Notebook } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

// === Types ===

const journalNav = {
  title: "Journal",
  href: "/journal",
  icon: Notebook,
  children: [
    { title: "Readings", href: "/journal/readings", icon: BookOpen },
    { title: "Spreads", href: "/journal/spreads", icon: GalleryHorizontalEnd },
    { title: "Insights", href: "/journal/insights", icon: Lightbulb },
  ],
}

// === Component ===

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const isJournalActive = pathname === "/journal" || pathname.startsWith("/journal/")

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2">
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
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isJournalActive}
                  tooltip={journalNav.title}
                  size="lg"
                >
                  <Link href={journalNav.href} className="flex items-center">
                    <journalNav.icon className="size-4 shrink-0" />
                    <span
                      className="transition-all duration-150 ease-in-out origin-left overflow-hidden whitespace-nowrap"
                      style={{
                        transform: isCollapsed ? 'scaleX(0)' : 'scaleX(1)',
                        width: isCollapsed ? '0' : 'auto',
                        opacity: isCollapsed ? 0 : 1,
                      }}
                    >
                      {journalNav.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {journalNav.children.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                      <SidebarMenuSubItem key={item.href}>
                        <SidebarMenuSubButton asChild isActive={isActive}>
                          <Link href={item.href} className="flex items-center gap-2">
                            <item.icon className="size-4 shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ModeToggle />
            {!isCollapsed && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Theme
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xs">
                TV
              </AvatarFallback>
            </Avatar>
            <div 
              className="flex-1 overflow-hidden transition-all duration-150 ease-in-out origin-left"
              style={{
                transform: isCollapsed ? 'scaleX(0)' : 'scaleX(1)',
                width: isCollapsed ? '0' : 'auto',
                opacity: isCollapsed ? 0 : 1,
              }}
            >
              <p className="text-sm font-medium whitespace-nowrap">Tarot User</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">tarot@vault.app</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

