import Updatecategories from '@/components/Updatecategories';
import React from 'react'
const fetchcategory = async (categoryslug) => {
    if (!categoryslug) {
      console.error("No categoryslug provided!");
      return null;
    }
  
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${categoryslug}`, {
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
const page = async({params}) => {
    const categoryslug =  params.slug
    const category = await fetchcategory(categoryslug)
  return (
    <div>
      <Updatecategories category={category}/>
    </div>
  )
}

export default page
