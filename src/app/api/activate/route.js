import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  // Find user by token (no expiry check)
  const user = await prisma.user.findFirst({
    where: { activationToken: token },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid activation link" },
      { status: 400 }
    );
  }

  // Activate user
  await prisma.user.update({
    where: { id: user.id },
    data: {
      isActive: true,
      activationToken: null, // Clear token after use
    },
  });

  return NextResponse.redirect(process.env.NEXTAUTH_URL + '/login?activated=true');
}