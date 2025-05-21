import Listcategories from '@/components/Listcategories'

import React from 'react'
 const getcategories=async()=>{ 
const response = await fetch(process.env.NEXTAUTH_URL +"/api/categories", { cache: 'no-store' }); 

const data = await response.json();  
    

return data; 
}
const page = async() => {
   
const categories = await getcategories();
  return (
    
    <div>
      <Listcategories categories={categories}/>
    </div>
  )
}

export default page
