/**
 * New Journal Action Button
 * 
 * Simple dropdown button for creating new readings, spreads, or insights.
 */
"use client"

import Link from "next/link"
import { ChevronDown, BookOpen, GalleryHorizontalEnd, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// === Constants ===

const actionLinks = [
  { label: "Reading", href: "/journal/readings/new", Icon: BookOpen },
  { label: "Spread", href: "/journal/spreads/new", Icon: GalleryHorizontalEnd },
  { label: "Insight", href: "/journal/insights/new", Icon: Lightbulb },
] as const

// === Component ===

export function NewJournalActionButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold">
          <span>New</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {actionLinks.map(({ label, href, Icon }) => (
          <DropdownMenuItem key={label} asChild>
            <Link href={href} className="flex items-center gap-2 cursor-pointer">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
