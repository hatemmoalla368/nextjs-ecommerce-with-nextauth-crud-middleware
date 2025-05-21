// /app/api/user/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust the import path to your nextauth config
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      address: true,
      phoneNumber: true,
    },
  });

  return Response.json(user);
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const data = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
    },
  });

  return Response.json({ message: "User updated successfully", user: updatedUser });
}
