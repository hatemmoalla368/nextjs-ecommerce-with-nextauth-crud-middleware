import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  const { token, password } = await req.json();

  // 1. Find user with this token (and check expiry)
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() }, // Not expired
    },
  });

  if (!user) {
    return Response.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  // 2. Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Update user & clear token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return Response.json({ message: "Password updated!" });
}