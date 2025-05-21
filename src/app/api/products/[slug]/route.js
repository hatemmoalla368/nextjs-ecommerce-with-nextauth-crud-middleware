import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const prisma = new PrismaClient()

// GET single product by slug
export const GET=async(req,{params})=> { 
  
  try { 
 
  const { slug } = params;
  
   const result =await prisma.product.findUnique({ 
      where:{ 
         slug: slug
      }, 
      select:{
        id:true,
        name: true,
        description:true,
        slug:true,
        price: true,
        stock:true,
        images:true,
        categoryId:true,
        category: {
      select: {
        name: true,
        id:true
      }
    }

      },
      
      
    }); 
    return  NextResponse.json( result) 
    
  } catch (error) { 
          
    } 
 
    
  } 

// UPDATE product by slug
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
          
          if (!session?.user?.role === "ADMIN") {
            return NextResponse.json(
              { error: "Unauthorized" },
              { status: 401 }
            );
          }
  const { slug } = params;
  const data = await request.json();
  const { name, description, stock, price,images,categoryId } = data;

  const newSlug = name.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

  try {
    const updatedproduct = await prisma.product.update({
      where: { slug: slug },
      data: {
        name,
        description,
        slug: newSlug,
         price: parseFloat(price) || 0, // Default to 0
        stock: parseInt(stock) || 0, // Default to 0
        images,
        categoryId
      },
    });
    return NextResponse.json(updatedproduct);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Error updating product' }), {
      status: 500,
    });
  }
}

// DELETE product by slug
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
          
          if (!session?.user?.role === "ADMIN") {
            return NextResponse.json(
              { error: "Unauthorized" },
              { status: 401 }
            );
          }
  const { slug } = params; // Correct destructuring
  
  if (!slug) {
    return new NextResponse(
      JSON.stringify({ error: 'Slug parameter is required' }),
      { status: 400 }
    );
  }

  try {
    await prisma.product.delete({
      where: { slug: slug }, // Explicit slug assignment
    });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Prisma error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Delete failed' }),
      { status: 500 }
    );
  }
}
