import Newproduct from "@/components/Newproduct";


const getcategories=async()=>{ 
    const response = await fetch(process.env.NEXTAUTH_URL+"/api/categories", { cache: 'no-store' }); 
    
    const data = await response.json();  
    
    return data; 
} 

const page = async() => {
    
    const categories = await getcategories()
  return (
    <div>
      <Newproduct categories={categories}/>
    </div>
  )
}

export default page
