import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, items } = body;

    const timestamp = Date.now().toString().slice(-4);
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const reference = `PHX-BC-${timestamp}-${randomHex}`;

    console.log(`[SOVEREIGN CHECKOUT INITIATED]`);
    console.log(`Reference: ${reference}`);
    console.log(`Amount: R${amount}`);
    console.log(`Items:`, JSON.stringify(items));
    console.log(`Timestamp: ${new Date().toISOString()}`);

    return NextResponse.json({ 
      success: true, 
      reference,
      amount
    }, { status: 200 });

  } catch (error) {
    console.error('[CHECKOUT ERROR ANOMALY]:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal processing failure' 
    }, { status: 500 });
  }
}