/**
 * App Header
 * 
 * Main application header with sidebar toggle, theme toggle, and new reading button.
 */
"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity text-white">
            <Link href="/new-reading">
              <Plus className="w-4 h-4" /> New Reading
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

