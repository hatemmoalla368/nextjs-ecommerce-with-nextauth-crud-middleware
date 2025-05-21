import Shop from '@/components/Shop'
import React from 'react'

const getproducts=async()=>{ 
const response = await fetch(process.env.NEXTAUTH_URL +"/api/products", { cache: 'no-store' }); 

    const { data, total } = await response.json()
    

return data; 
}

const getproductstotal=async()=>{ 
const response = await fetch(process.env.NEXTAUTH_URL +"/api/products", { cache: 'no-store' }); 

    const { data, total } = await response.json()
    

return total; 
}
const getcategories=async()=>{ 
const response = await fetch(process.env.NEXTAUTH_URL +"/api/categories", { cache: 'no-store' }); 

const data = await response.json();  
    

return data; 
}



const page = async() => {
    const products = await getproducts();
    const productstotal = await getproductstotal();
    const categories = await getcategories();


  return (
    <div>
      <Shop products={products} productstotal={productstotal} categories={categories}/>
    </div>
  )
}

export default page
