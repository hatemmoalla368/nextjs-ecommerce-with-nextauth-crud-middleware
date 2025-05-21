import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { id } = params;
  const { status } = await req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update order" }),
      { status: 500 }
    );
  }
}