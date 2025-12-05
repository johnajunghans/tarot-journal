export async function generateInterpretation(
    apiKey: string,
    systemPrompt: string,
    userPrompt: string
): Promise<string> {
    if (!apiKey) {
        throw new Error("API Key is missing");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "amazon/nova-2-lite-v1:free", // Or similar available model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`OpenRouter API Error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
