import { NextResponse } from 'next/server';
import { extractDataFromID } from '@/ai/flows/extract-data-from-id';

export async function GET() {
    try {
        const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;
        return NextResponse.json({
            status: 'ready',
            hasApiKey: !!apiKey,
            apiKeyPrefix: apiKey ? apiKey.substring(0, 5) + '...' : 'none'
        });
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
