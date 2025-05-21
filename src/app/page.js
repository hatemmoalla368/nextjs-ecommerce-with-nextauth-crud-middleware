
import Banners from "@/components/Banners";
import Features from "@/components/Features";
import Mainhero from "@/components/Mainhero";
import Topfeaturedproducts from "@/components/Topfeaturedproducts";
import Topsellingproducts from "@/components/Topsellingproducts";
const gettopproducts=async()=>{ 
const response = await fetch(process.env.NEXTAUTH_URL +"/api/products/top-selling", { cache: 'no-store' }); 

const data = await response.json();  
    

return data; 
}


const Home = async() => {
   
const topproducts = await gettopproducts();
  
  
  return (
    <>
    <main className="main">
      <Mainhero/>
      <Features/>
      <Banners/>
      
      <Topfeaturedproducts topproducts={topproducts}/>
    </main>
    </>
  );
}
export default Home