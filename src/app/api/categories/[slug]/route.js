// app/api/categories/[slug]/route.js
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// DELETE /api/categories/:slug
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
    await prisma.category.delete({
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

// PUT /api/categories/:slug
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
  const { name, description } = data;

  const newSlug = name.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

  try {
    const updatedCategory = await prisma.category.update({
      where: { slug: slug },
      data: {
        name,
        description,
        slug: newSlug,
      },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Error updating category' }), {
      status: 500,
    });
  }
}

export const GET=async(req,{params})=> { 
  try { 
 
  const { slug } = params;
  
   const result =await prisma.category.findUnique({ 
      where:{ 
         slug: slug
      }, 
      select:{
        id:true,
        name: true,
        description:true,
        slug:true

      }
      
    }); 
    return  NextResponse.json( result) 
    
  } catch (error) { 
          
    } 
 
    
  } 
