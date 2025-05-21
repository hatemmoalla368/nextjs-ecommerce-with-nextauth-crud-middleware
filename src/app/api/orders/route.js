// app/api/orders/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust the import path to your nextauth config
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        orders: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            status: true,
            createdAt: true,
            items: {
              select: {
                quantity: true,
                price: true,
                product: {
                  select: { name: true, images:true },
                },
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(user.orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
  }
}
