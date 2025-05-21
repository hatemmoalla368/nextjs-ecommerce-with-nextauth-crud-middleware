import Shopproduct from '@/components/Shopproduct'
import React from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const fetchproduct = async (productslug) => {
    if (!productslug) {
      console.error("No productsslug provided!");
      return null;
    }
  
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${productslug}`, {
        method: "GET",
      });
  
      if (!res.ok) {
        console.error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        return null;
      }
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };
const page = async({params}) => {
    const productslug =  params.slug
    const product = await fetchproduct(productslug)
     console.log('product', product)
     const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id }, // exclude the current product
    },
    select: {
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
      }
    }
    },
    
  });
 
  const serializedProduct = {
  ...product,
  price: parseFloat(product.price),
  stock: Number(product.stock),
};

const serializedRelated = relatedProducts.map((p) => ({
  ...p,
  price: parseFloat(p.price),
}));    


  return (
    <div>
      <Shopproduct product={product} serializedRelated={serializedRelated}/>
    </div>
  )
}

export default page
