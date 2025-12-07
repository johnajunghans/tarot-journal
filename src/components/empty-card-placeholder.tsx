/**
 * Empty Card Placeholder
 * 
 * Displays a dashed placeholder for an unassigned card position in a spread.
 * Used in SpreadLayout to indicate where cards can be placed.
 */
import { Plus } from "lucide-react"

// === Types ===

interface EmptyCardPlaceholderProps {
    /** The position label to display (e.g., "Past", "Present", "Future") */
    label: string
    /** Whether to rotate the text 90 degrees (used for Celtic Cross crossing card) */
    rotateText?: boolean
    /** Whether to align text to top instead of center (used for Celtic Cross center) */
    deCenterText?: boolean
}

// === Component ===

export function EmptyCardPlaceholder({ 
    label, 
    rotateText, 
    deCenterText 
}: EmptyCardPlaceholderProps) {
    return (
        <div 
            className={`w-[120px] h-[200px] border-2 border-dashed rounded-lg flex ${
                deCenterText ? "items-start pt-2" : "items-center"
            } justify-center bg-card/30`}
        >
            <div 
                className={`flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground ${
                    rotateText ? "-rotate-90" : ""
                }`}
            >
                <Plus className="h-4 w-4" />
                <span className="px-2 leading-tight">{label}</span>
            </div>
        </div>
    )
}

