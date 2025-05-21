import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient()

// GET all products
export async function GET() {
  const session = await getServerSession(authOptions);
        
        if (!session?.user?.role === "ADMIN") {
          return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
          );
        }
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    const totalCount = await prisma.product.count()

    return NextResponse.json({
      success: true,
      data: products,
      total: totalCount
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create new product
export async function POST(request) {
  const session = await getServerSession(authOptions);
        
        if (!session?.user?.role === "ADMIN") {
          return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
          );
        }
  try {
    const data = await request.json();
    const { name, description, price, stock, images, categoryId, slug } = data;
    
    // Validate required fields
    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 }
      );
    }

    

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || null, // Handle optional field
        price: parseFloat(price) || 0, // Default to 0
        stock: parseInt(stock) || 0, // Default to 0
        images: images || 'default.jpg', // Accepts single string
        categoryId,
        totalOrders: 0
      }
    });

    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { 
        error: 'Failed to create product',
        details: error.message // Include actual error message
      },
      { status: 500 }
    );
  }
}