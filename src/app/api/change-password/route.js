import { getServerSession } from "next-auth";

import { hash, compare } from "bcryptjs";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust the import path to your nextauth config
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { current_password, password, password_confirmation } = await req.json();

  if (!current_password || !password || !password_confirmation) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  if (password !== password_confirmation) {
    return new Response(JSON.stringify({ error: "Passwords do not match" }), {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const passwordMatch = await compare(current_password, user.password);

  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: "Current password is incorrect" }), {
      status: 400,
    });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword },
  });

  return new Response(JSON.stringify({ message: "Password updated successfully" }), {
    status: 200,
  });
}
