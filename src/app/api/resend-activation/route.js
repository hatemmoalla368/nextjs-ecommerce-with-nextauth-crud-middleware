// app/api/resend-activation/route.js
import { PrismaClient } from '@prisma/client';
import { sendActivationEmail } from '@/lib/mailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { 
        status: 404 
      });
    }

    // 2. Generate new token if none exists
    const activationToken = user.activationToken || crypto.randomBytes(32).toString('hex');

    // 3. Update user record
    await prisma.user.update({
      where: { email },
      data: { activationToken },
    });

    // 4. Send email
    await sendActivationEmail(email, activationToken);

    return new Response(
      JSON.stringify({ message: "Activation email resent" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to resend email" }),
      { status: 500 }
    );
  }
}