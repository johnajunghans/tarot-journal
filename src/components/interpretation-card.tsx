/**
 * Interpretation Card
 * 
 * Displays a single AI interpretation with collapsible content.
 */
"use client"

import { useState } from "react"
import { Interpretation } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { formatDate } from "@/lib/utils"

// === Types ===

interface InterpretationCardProps {
    interpretation: Interpretation
}

// === Component ===

export function InterpretationCard({ interpretation: interp }: InterpretationCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card>
            <CardHeader 
                className="bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors" 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                        {interp.question && <CardTitle className="text-lg">Q: {interp.question}</CardTitle>}
                        {interp.context && <p className="text-sm text-muted-foreground">Context: {interp.context}</p>}
                        {interp.focus && <p className="text-sm text-muted-foreground italic">Focus: {interp.focus}</p>}
                        <p className="text-xs text-muted-foreground">{formatDate(interp.date || interp.createdAt)}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2 shrink-0">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </div>
            </CardHeader>
            {isExpanded && (
                <CardContent className="pt-6 prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{interp.aiResponse || interp.content}</ReactMarkdown>
                </CardContent>
            )}
        </Card>
    )
}

