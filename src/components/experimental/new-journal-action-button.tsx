/**
 * New Journal Action Button
 * 
 * Animated "+ New" control that morphs into three separate circular icon buttons on hover,
 * with a unified gradient mask effect. Toggles on click for mobile devices.
 */
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { BookOpen, GalleryHorizontalEnd, Lightbulb } from "lucide-react"

// === Constants ===

const actionLinks = [
  { label: "New Reading", href: "/journal/readings/new", Icon: BookOpen },
  { label: "New Spread", href: "/journal/spreads/new", Icon: GalleryHorizontalEnd },
  { label: "New Insight", href: "/journal/insights/new", Icon: Lightbulb },
] as const

// === Component ===

export function NewJournalActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close on mobile
  useEffect(() => {
    if (!isExpanded || isNavigating) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded, isNavigating])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLinkClick = () => {
    setIsNavigating(true)
  }

  return (
    <div 
      ref={containerRef}
      className="group relative inline-flex"
      onMouseEnter={() => !isNavigating && setIsExpanded(true)}
      onMouseLeave={() => !isNavigating && setIsExpanded(false)}
    >
      {/* Gradient background layer - extends across all buttons */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md transition-all duration-300 ease-out"
        style={{
          width: isExpanded ? 'calc(40px * 3 + 8px * 2)' : '112px',
        //   borderRadius: isExpanded ? '9999px' : '8px',
        }}
      />

      {/* Mask layer - reveals gradient through button shapes */}
      <div 
        className="relative flex justify-center items-center transition-all duration-300 ease-out"
        style={{
          gap: isExpanded ? '8px' : '0px',
        }}
      >
        {/* Text overlay - visible when not expanded */}
        <div 
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-scale duration-300 ease-out z-10 ${
            isExpanded ? 'scale-0' : 'scale-100'
          }`}
        >
          <span className="text-sm font-semibold text-white whitespace-nowrap tracking-wide">
            + New
          </span>
        </div>

        {/* Three button segments */}
        {actionLinks.map(({ href, label, Icon }, index) => (
          <Link
            key={label}
            href={href}
            className="relative flex items-center justify-center text-white transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:brightness-110"
            style={{
              height: '40px',
              width: isExpanded ? '40px' : index === 1 ? '32px' : '40px',
              borderRadius: isExpanded ? '9999px' : index === 0 ? '9999px 0 0 9999px' : index === 2 ? '0 9999px 9999px 0' : '0',
            }}
            onClick={(e) => {
              if (!isExpanded) {
                e.preventDefault()
                handleToggle()
              } else {
                handleLinkClick()
              }
            }}
          > 
            {/* Icon */}
            <Icon
              className={`transition-all duration-300 ease-out ${
                isExpanded ? 'h-[18px] w-[18px] opacity-100' : 'h-0 w-0 opacity-0'
              }`}
              strokeWidth={1.75}
            />
            
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

