// app/api/search/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = decodeURIComponent(searchParams.get('category')).trim();
    const query = decodeURIComponent(searchParams.get('query')).trim();

    // Validate category (skip if "All Categories")
    const categoryFilter = category !== "All Categories" ? {
      category: {
        name: {
          equals: category,
          mode: 'insensitive',
        },
      },
    } : {};

    // Validate query (skip if empty)
    const queryFilter = query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    } : {};

    const products = await prisma.product.findMany({
      where: {
        AND: [categoryFilter, queryFilter].filter(Boolean), // Remove empty filters
      },
      include: {
        category: true,
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return new Response(JSON.stringify({ error: "Search failed" }), { status: 500 });
  }
}