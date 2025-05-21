"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';
const Searchform = () => {
      const { addItem } = useShoppingCart()
    
      const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchResults() {
      const category = searchParams.get("category");
      const query = searchParams.get("query");

      const res = await fetch(`/api/search?category=${category}&query=${query}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchResults();
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price * 100, // price must be in cents for use-shopping-cart
      currency: 'USD',
      image: product.images,
      slug:product.slug
 // optional if you want image preview
    })
  }
  return (
    <main className="main">
          <div className="container mt-30 mb-30">
             <div className="row flex-row-reverse" >
    
                
                <div className="col-lg-9 mb-20">
                   <div className="shop-product-fillter">
                      <div className="totall-product">
      <p>
        We found &nbsp;  
        <strong className="text-brand">
          {products.length} {/* Changed from productstotal */}
        </strong> 
        {products.length === 1 ? 'item' : 'items'} for you!
        
      </p>
    </div>
    
                     
                
                
                
    
                   </div>
        <div className="row product-grid">
      {products.map((product) => (
        <div key={product.id} className="col-lg-4 col-md-6 mb-4">
          <div className="product-flex-wrapper-1">
            <div className="product">
              <div className="product-wrapper style-2">
                <div className="product-content product-content-wrap">
                  <div className="thumbnail-wrapper">
                    <div className="product-img product-img-zoom">
                      <Link href={`/products/${product.slug}`}>
                        <img className="default-img" src={product.images} alt="" />
                      </Link>
                    </div>
                    
                  </div>
                  <div className="content-wrapper">
                    <span className="product-cat">{product.category.name}</span>
                    <h3 className="product-title">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <div className="product-cart-form">
                      <span className="price">
                        <span className="amount">
                          <bdi><span>&#36;</span>{product.price}</bdi>
                        </span>
                      </span>
                      <a  className="button" onClick={() => handleAddToCart(product)}><i className="fi-rs-shopping-bag-add"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    
                   
                       
            
    
                </div>
    
    
                
    
             </div>
          </div>
       </main>
  )
}

const Search = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Searchform />
    </Suspense>
  );
};

export default Search;
