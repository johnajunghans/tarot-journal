import { NextResponse } from 'next/server';
import { generateInterpretation } from '@/lib/openrouter';

export async function POST(req: Request) {
    try {
        const { systemPrompt, userPrompt, apiKey } = await req.json();

        // Prioritize key from request (if we allow user to input it), else env.
        const key = apiKey || process.env.OPENROUTER_API_KEY;

        if (!key) {
            return NextResponse.json(
                { error: 'OpenRouter API Key is missing. Please set OPENROUTER_API_KEY in .env.local or provide it in the UI.' },
                { status: 401 }
            );
        }

        const interpretation = await generateInterpretation(key, systemPrompt, userPrompt);
        return NextResponse.json({ interpretation });
    } catch (error: any) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate interpretation' },
            { status: 500 }
        );
    }
}
