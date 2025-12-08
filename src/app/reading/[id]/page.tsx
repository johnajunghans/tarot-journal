"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Reading, Interpretation } from "@/lib/types"
import { ReadingType } from "@/lib/spread-config"
import { getReadingById, updateReading, deleteReading } from "@/lib/storage"
import { SpreadLayout } from "@/components/spread-layout"
import { Button } from "@/components/ui/button"
import { InterpretationDialog } from "@/components/interpretation-dialog"
import { InterpretationCard } from "@/components/interpretation-card"
import { Download, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"

export default function ReadingDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [reading, setReading] = useState<Reading | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (typeof id === 'string') {
            const r = getReadingById(id)
            if (r) {
                setReading(r)
            }
            setLoading(false)
        }
    }, [id])

    if (loading) return <div className="p-8 text-center">Loading...</div>
    if (!reading) return <div className="p-8 text-center text-red-500">Reading not found</div>

    const handleSaveInterpretation = (interp: Interpretation) => {
        const updated = {
            ...reading,
            interpretations: [interp, ...reading.interpretations]
        };
        updateReading(updated);
        setReading(updated);
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this reading?")) {
            deleteReading(reading.id);
            router.push('/readings');
        }
    };

    const handleDownload = () => {
        const content = `
            # Tarot Reading - ${formatDate(reading.date || reading.createdAt)}
            Type: ${reading.spreadName || reading.type || reading.spreadId}

            ## Cards
            ${reading.cards.map(c => `- ${c.positionLabel}: ${c.cardName} (${c.orientation})`).join('\n')}

            ## Interpretations
            ${reading.interpretations.map(i => `
                ### Question: ${i.question || reading.question}
                **Context:** ${i.context || reading.context || 'None'}
                **Date:** ${formatDate(i.date || i.createdAt)}

                ${i.aiResponse || i.content}
            `).join('\n---\n')}
        `.trim();

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = (reading.date || reading.createdAt).split('T')[0];
        a.download = `tarot-reading-${dateStr}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-background pb-20">
            <main className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-center flex-1 space-y-2">
                        <h1 className="text-3xl font-bold capitalize">{reading.spreadName || (reading.type || reading.spreadId || '').replace('-', ' ')}</h1>
                        <p className="text-muted-foreground">{formatDate(reading.date || reading.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleDownload} title="Download Markdown">
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleDelete} title="Delete Reading">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Spread Visualization */}
                <div className="bg-secondary/20 rounded-xl p-4 md:p-8 min-h-[400px] flex items-center justify-center border">
                    <SpreadLayout type={(reading.type || reading.spreadId) as ReadingType} cards={reading.cards} />
                </div>

                {/* Action Bar */}
                <div className="flex justify-center">
                    <InterpretationDialog reading={reading} onSave={handleSaveInterpretation} />
                </div>

                <Separator />

                {/* Interpretations List */}
                <div className="space-y-8 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold">Interpretations</h2>
                    {reading.interpretations.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No interpretations yet. Ask the AI for guidance above.</p>
                    ) : (
                        reading.interpretations.map((interp) => (
                            <InterpretationCard key={interp.id} interpretation={interp} />
                        ))
                    )}
                </div>
            </main>
        </div>
    )
}
