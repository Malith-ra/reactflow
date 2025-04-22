import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_TOKEN!;
const fromNumber = process.env.TWILIO_PHONE!;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing `to` or `message` field' },
        { status: 400 },
      );
    }

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to,
    });

    return NextResponse.json({ success: true, sid: result.sid });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
