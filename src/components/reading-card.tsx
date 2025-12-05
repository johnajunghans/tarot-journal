import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reading } from "@/lib/types"
import { ArrowRight, Calendar, Layers } from "lucide-react"

interface ReadingListCardProps {
    reading: Reading
}

export function ReadingListCard({ reading }: ReadingListCardProps) {
    const latestInterp = reading.interpretations?.[0];
    const question = latestInterp?.question || "No interpretation yet";

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className="capitalize">{reading.type.replace('-', ' ')}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(reading.date).toLocaleDateString()}
                    </span>
                </div>
                <CardTitle className="text-lg mt-2 line-clamp-1">
                    {question}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Layers className="w-4 h-4" />
                    {reading.cards.length} cards
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-between">
                    <Link href={`/reading/${reading.id}`}>
                        View Reading <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
