/**
 * Theme Provider
 * 
 * Wraps the application with next-themes for dark/light mode support.
 * This context provider should wrap the entire app in the root layout.
 */
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

