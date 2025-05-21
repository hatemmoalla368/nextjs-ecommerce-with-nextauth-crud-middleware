import { PrismaClient } from '@prisma/client'; 
import { getServerSession } from 'next-auth';
import { NextResponse } from "next/server"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient(); 

export const querylivpopulated=async()=>{
  try{
    const catp = await prisma.category.findMany({
      select:{
        id:true,
        name:true,
        description: true,
        slug:true,
        

      }

      
    })
    return catp
  }catch (error) { 
    
} 
finally{ 
    prisma.$disconnect() 
} 
}



export const QueryLiv=async()=>{ 
try { 
const listcategories=await prisma.category.findMany(); 
return listcategories 
} catch (error) { 

} 
finally{ 
prisma.$disconnect() 
} 
} 


export async function GET() {  

  

    const categories = await querylivpopulated()  
    
    return NextResponse.json(categories);  
    
    } 
// CREATE DATA 
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
    

    const {name, description, slug}= data;
 
    const newcategory = await prisma.category.create({ 
      data: {
        name,
        description,
        slug
        
      }
    }); 
 
    return NextResponse.json(newcategory); 
  } catch (error) { 
       return new NextResponse(JSON.stringify(error), { 
      status: 500, 
      headers: { "Content-Type": "application/json" }, 
    }); 
  } 
} 