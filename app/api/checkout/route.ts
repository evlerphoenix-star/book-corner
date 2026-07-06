import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, productName, amount } = await req.json();

    // Generate a random 4-digit reference appended to BC-
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const reference = `BC-${randomCode}`;

    const order = await prisma.bookOrder.create({
      data: {
        customerEmail: email,
        productName: productName,
        reference: reference,
        amount: parseInt(amount),
        status: 'PENDING'
      }
    });

    return NextResponse.json({ 
      success: true, 
      reference: order.reference,
      message: `Please deposit exactly ${amount} rand using reference ${order.reference}` 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}