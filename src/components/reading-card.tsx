/**
 * Reading Card
 * 
 * A card component for displaying a reading summary in the readings list.
 * Shows the spread type, date, latest question, and card count.
 */
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reading } from "@/lib/types"
import { ArrowRight, Calendar, Layers } from "lucide-react"

// === Types ===

interface ReadingListCardProps {
    reading: Reading
}

// === Component ===

export function ReadingListCard({ reading }: ReadingListCardProps) {
    const question = reading.question || "Untitled Reading";

    // specific date formatting to avoid timezone shifts with YYYY-MM-DD
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        // If it's already just a date (YYYY-MM-DD), return it or format gently
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateStr;
        }
        // Fallback for ISO strings
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <Link href={`/reading/${reading.id}`}>
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="capitalize">{reading.type.replace('-', ' ')}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(reading.date)}
                        </span>
                    </div>
                    <CardTitle className="text-lg mt-2 line-clamp-1">
                        {question}
                    </CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}
