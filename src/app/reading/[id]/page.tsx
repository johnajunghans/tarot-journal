"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Reading, Interpretation } from "@/lib/types"
import { getReadingById, updateReading, deleteReading } from "@/lib/storage"
import { SpreadLayout } from "@/components/spread-layout"
import { Button } from "@/components/ui/button"
import { InterpretationDialog } from "@/components/interpretation-dialog"
import { ArrowLeft, Download, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"

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
            router.push('/');
        }
    };

    const handleDownload = () => {
        const content = `
# Tarot Reading - ${new Date(reading.date).toLocaleDateString()}
Type: ${reading.type}

## Cards
${reading.cards.map(c => `- ${c.positionLabel}: ${c.cardName} (${c.orientation})`).join('\n')}

## Interpretations
${reading.interpretations.map(i => `
### Question: ${i.question}
**Context:** ${i.context || 'None'}
**Date:** ${new Date(i.date).toLocaleString()}

${i.aiResponse}
`).join('\n---\n')}
    `.trim();

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tarot-reading-${reading.date.split('T')[0]}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-20">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 w-4 h-4" /> Home
                    </Button>
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <Button variant="outline" size="sm" onClick={handleDownload} title="Download Markdown">
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleDelete} title="Delete Reading">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold capitalize">{reading.type.replace('-', ' ')}</h1>
                    <p className="text-muted-foreground">{new Date(reading.date).toLocaleDateString()} at {new Date(reading.date).toLocaleTimeString()}</p>
                </div>

                {/* Spread Visualization */}
                <div className="bg-secondary/20 rounded-xl p-4 md:p-8 min-h-[400px] flex items-center justify-center border">
                    <SpreadLayout type={reading.type} cards={reading.cards} />
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
                            <Card key={interp.id}>
                                <CardHeader className="bg-muted/50">
                                    <CardTitle className="text-lg">Q: {interp.question}</CardTitle>
                                    {interp.context && <p className="text-sm text-muted-foreground">Context: {interp.context}</p>}
                                    <p className="text-xs text-muted-foreground mt-2">{new Date(interp.date).toLocaleString()}</p>
                                </CardHeader>
                                <CardContent className="pt-6 prose dark:prose-invert max-w-none">
                                    <ReactMarkdown>{interp.aiResponse}</ReactMarkdown>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </main>
        </div>
    )
}
