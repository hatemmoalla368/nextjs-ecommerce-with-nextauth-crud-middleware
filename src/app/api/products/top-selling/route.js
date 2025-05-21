// /app/api/products/top-selling/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topSellingProducts = await prisma.product.findMany({
      orderBy: {
        totalOrders: 'desc', // Sort from highest to lowest
      },
      include: {
        category: true, // Include related category if needed
      },
      take: 10, // Limit to top 10 products (adjust as needed)
    });

    return new Response(JSON.stringify(topSellingProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch top-selling products' }),
      { status: 500 },
    );
  }
}