import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const res = await fetch('https://next-agent-ai.arimac.xyz/chat/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch AI response' },
        { status: 500 },
      );
    }

    const data = await res.json();
    return NextResponse.json({
      aiResponse: data.llm_response_text || '⚠️ No response',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
