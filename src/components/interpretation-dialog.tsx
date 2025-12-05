"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Reading, Interpretation } from "@/lib/types"
import { Loader2, Sparkles } from "lucide-react"
import { cards } from "@/lib/tarot-data"

interface InterpretationDialogProps {
    reading: Reading
    onSave: (interpretation: Interpretation) => void
}

export function InterpretationDialog({ reading, onSave }: InterpretationDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [question, setQuestion] = React.useState("")
    const [context, setContext] = React.useState("")
    const [apiKey, setApiKey] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [result, setResult] = React.useState<string | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const handleGenerate = async () => {
        if (!question) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Construct Prompt
            const cardListText = reading.cards
                .sort((a, b) => a.position - b.position)
                .map(c => {
                    const fullInfo = cards.find(info => info.id === c.cardId);
                    return `${c.position}. ${c.positionLabel}: ${c.cardName} (${c.orientation === 'reversed' ? 'Reversed' : 'Upright'}) - ${fullInfo?.uprightMeaning || ''}`;
                })
                .join('\n');

            const systemPrompt = `You are an experienced and insightful tarot reader. Return your interpretation in well-formatted markdown.`;
            const userPrompt = `
Reading Type: ${reading.type}
Question: ${question}
Context: ${context}

Cards:
${cardListText}

Please provide your interpretation.
      `.trim();

            const res = await fetch('/api/interpret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ systemPrompt, userPrompt, apiKey })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch");

            setResult(data.interpretation);

        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!result) return;
        const interp: Interpretation = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            question,
            context,
            aiResponse: result,
            model: 'claude-3-sonnet' // or whatever
        };
        onSave(interp);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                    <Sparkles className="w-4 h-4" />
                    Get AI Interpretation
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Ask the Tarot</DialogTitle>
                    <DialogDescription>
                        Provide your question and context for a deeper reading.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 py-4">
                    {!result ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Your Question</Label>
                                <Input
                                    placeholder="What should I focus on?"
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Context (Optional)</Label>
                                <Textarea
                                    placeholder="Additional background..."
                                    value={context}
                                    onChange={e => setContext(e.target.value)}
                                    className="h-24"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">OpenRouter API Key (Optional if env set)</Label>
                                <Input
                                    type="password"
                                    placeholder="sk-or-..."
                                    value={apiKey}
                                    onChange={e => setApiKey(e.target.value)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="prose dark:prose-invert text-sm max-w-none">
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded">
                            {error}
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    {!result ? (
                        <Button onClick={handleGenerate} disabled={loading || !question} className="w-full sm:w-auto">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => setResult(null)}>Refine Question</Button>
                            <Button onClick={handleSave}>Save Interpretation</Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
