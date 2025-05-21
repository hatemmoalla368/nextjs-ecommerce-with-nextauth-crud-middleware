

import Listproducts from '@/components/Listproducts';
import React from 'react'
 const getproducts=async()=>{ 
const response = await fetch(process.env.NEXTAUTH_URL +"/api/products", { cache: 'no-store' }); 

    const { data, total } = await response.json()
    

return data; 
}
const page = async() => {
   
const products = await getproducts();
  return (
    
    <div>
      <Listproducts products={products} />
    </div>
  )
}

export default page
