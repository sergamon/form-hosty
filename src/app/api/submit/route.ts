import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    console.log('Submitting data to webhook Proxy handler...');

    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('WEBHOOK_URL environment variable is not defined');
      return NextResponse.json(
        { message: 'Server configuration error: Webhook URL not configured.' },
        { status: 500 }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Webhook Error Response:', errorText);
      console.error('Webhook Status:', webhookResponse.status);

      // Special handling for n8n "Unused Respond to Webhook node" error
      if (webhookResponse.status === 500 && errorText.includes('Unused Respond to Webhook node')) {
        console.warn('Handling n8n 500 error as success due to known workflow issue (Unused Respond to Webhook node)');
        return NextResponse.json({
          message: 'Submission accepted (processed by workflow)',
          warning: 'The workflow did not return a response but execution was triggered.'
        });
      }

      return NextResponse.json(
        {
          message: `Upstream server error (${webhookResponse.status})`,
          details: errorText.length > 100 ? errorText.substring(0, 100) + '...' : errorText
        },
        { status: webhookResponse.status }
      );
    }

    const contentType = webhookResponse.headers.get('content-type');
    let responseData;

    if (contentType && contentType.includes('application/json')) {
      responseData = await webhookResponse.json().catch(() => ({
        message: 'Submission accepted',
        note: 'Response was empty or invalid JSON'
      }));
    } else {
      const textData = await webhookResponse.text();
      responseData = { message: 'Submission successful', raw: textData };
    }

    return NextResponse.json(responseData);

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'Internal server error processing the request.' },
      { status: 500 }
    );
  }
}

