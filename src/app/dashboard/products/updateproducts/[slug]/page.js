import Updateproducts from '@/components/Updateproducts';
import React from 'react'
const fetchproduct = async (productslug) => {
    if (!productslug) {
      console.error("No categoryslug provided!");
      return null;
    }
  
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${productslug}`, {
        method: "GET",
      });
  
      if (!res.ok) {
        console.error(`Failed to fetch category: ${res.status} ${res.statusText}`);
        return null;
      }
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  };

  const getcategories=async()=>{ 
    const response = await fetch(process.env.NEXTAUTH_URL+"/api/categories", { cache: 'no-store' }); 
    
    const data = await response.json();  
    
    return data; 
} 
const page = async({params}) => {
    const productslug =  params.slug
    const product = await fetchproduct(productslug)
        const categories = await getcategories()

  return (
    <div>
      <Updateproducts product={product} categories={categories}/>
    </div>
  )
}

export default page
