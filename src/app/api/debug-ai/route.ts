import { NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';

export async function GET() {
    try {
        const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

        // Try a simple generation to test the key and model
        const { text } = await ai.generate('Say "API is working"');

        return NextResponse.json({
            status: 'ready',
            aiResponse: text,
            hasApiKey: !!apiKey,
            apiKeyPrefix: apiKey ? apiKey.substring(0, 5) + '...' : 'none'
        });
    } catch (error: any) {
        console.error('Debug AI Error:', error);
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
