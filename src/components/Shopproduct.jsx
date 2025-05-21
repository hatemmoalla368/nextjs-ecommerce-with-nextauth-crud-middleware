"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';


const Shopproduct = ({product, serializedRelated}) => {
      const [quantity, setQuantity] = useState(1);
  const {
    addItem,
    setItemQuantity,
    cartDetails
  } = useShoppingCart();

  const handleAddToCart = () => {
  const existingItem = cartDetails?.[product.id];

  if (existingItem) {
    // Add the current quantity (from state) to the existing one
    const newQuantity = existingItem.quantity + quantity;
    setItemQuantity(product.id, newQuantity);
  } else {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price * 100, // in cents
      currency: 'USD',
            slug:product.slug,

      image: Array.isArray(product.images) ? product.images[0] : product.images,
    }, { count: quantity });  // Note: changed to 'count' instead of 'quantity'
  }
  
  // Reset quantity to 1 after adding to cart
  setQuantity(1);
};

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  const handleAddToCartrelated = (product) => {
  addItem({
    id: product.id,
    name: product.name,
    price: product.price * 100,
    currency: 'USD',
          slug:product.slug,

    image: product.images,
  }, { quantity: 1 });
};

  return (
    <main className="main">
      <div className="page-header breadcrumb-wrap pt-3">
         <div className="container">
            <div className="breadcrumb">
               <Link href="/" rel="nofollow">Home</Link>
               <span></span> 
               <Link href="/shop">
                  Shop
               </Link> <span></span> {product.name}
            </div>
         </div>
      </div>

      <div className="container mt-30 mb-30 single-product-page">
         <div className="row">
            <div className="col-lg-9">
               <div className="row">
                  
                  <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                     <div className="detail-gallery">
                        <span className="zoom-icon"><i className="fi-rs-search"></i></span>
                        
                        <div className="product-image-slider">
                           <figure className="border-radius-10">
                              <img src={product.images} alt={product.name} />
                           </figure>
                          
                           
                        </div>

                        
                        
                     </div>
                     
                  </div>

                 
                  <div className="col-md-6 col-sm-12 col-xs-12">
                     <div className="product-info pr-10 pl-10">
                        
                        <h3 className="title-detail mb-2">
                           <Link href={`/products/${product.slug}`} className="modal-title text-heading">
                              {product.name}
                           </Link>
                        </h3>
                        
      
                        <div className="clearfix product-price-cover">
                           <div className="product-price primary-color float-left">
                              <span className="current-price text-brand">{product.price}$</span>
                              <span>
                                 
                                 
                              </span>
                           </div>
                           
                        </div>
                        <p className="description">
                           {product.description}
                        </p>
                        
                        <div className="qtty-container mb-30">
                           <div className="qty-btns radius">
                              <button type="submit" onClick={decrement} className="qty-down">
          <i className="fas fa-minus"></i>
        </button>
                              <span className="qty-val">{quantity}</span>
                              <button type="submit" onClick={increment} className="qty-up">
          <i className="fas fa-plus"></i>
        </button>
                           </div>
                           <div className="cart-btn">
                              <button type="submit" onClick={() => handleAddToCart(product)} className="button button-add-to-cart">
                                 <span className="d-lg-flex d-none">Add to cart</span> <i className="fi-rs-shopping-bag-add"></i>
                              </button>
                           </div>
                        </div>
                        
                        <div className="font-xs">
                           <ul>
                              <li className="mb-2">Category: <span className="text-brand">{product.category.name}</span></li>
                              
                              <li>Availability: <span className="text-success">{product.stock} items in stock</span></li>
                           </ul>
                        </div>
                        
                     </div>
                     
                  </div>

                  
                  

                  
                <div className="mt-60 mb-30">
  <h2 className="section-title style-1 mb-30">Related products</h2>
  <div className="related-products-container"> {/* Add this wrapper */}
    {serializedRelated.map((related) => (
      <div key={related.id} className="related-product-item"> {/* Add className */}
        <div className="product">
          <div className="product-wrapper style-2">
              <div className="product-wrapper style-2">
                <div className="product-content product-content-wrap">
                  <div className="thumbnail-wrapper">
                    <div className="product-img product-img-zoom">
                      <Link href="/">
                        <img style={{ width: '100%', height: 'auto', objectFit: 'cover' }} className="default-img" src={related.images} alt={related.name} />
                      </Link>
                    </div>
                    
                  </div>
                  <div className="content-wrapper">
                    <span className="product-cat">{related.category.name}</span>
                    <h3 className="product-title">
                      <Link href={`/products/${related.slug}`}>{related.name}</Link>
                    </h3>
                    <div className="product-cart-form">
                      <span className="price">
                        <span className="amount">
                          <bdi><span>&#36;</span>{related.price}</bdi>
                        </span>
                      </span>
                      <a onClick={() => handleAddToCartrelated(related)} className="button">
                        <i className="fi-rs-shopping-bag-add"></i>
                      </a>
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

            <div className="col-lg-3 shop-sidebar sticky-sidebar pr-10 mb-20">
               <div className="row">
                  
                  <div className="col-md-12 col-lg-12">
                     <div className="alert-message">
                        Covid-19 info: We keep delivering.
                     </div>

                     <div className="delivery-widget mb-30">
                        <ul>
                           <li className="mb-30">
                              <div className="icon">
                                 <i className="fi-rs-envelope"></i>
                              </div>
                              <div className="message">$10 shipping fee</div>
                           </li>
                           <li className="mb-30">
                              <div className="icon">
                                 <i className="fi-rs-heart"></i>
                              </div>
                              <div className="message">Guranteed 100% Organic from natural farmas</div>
                           </li>
                           <li>
                              <div className="icon">
                                 <i className="fi-rs-money"></i>
                              </div>
                              <div className="message">3 Days Returns if you change your mind</div>
                           </li>
                        </ul>
                     </div>
                  </div>

                  
                  
               </div>
               
               
               

               <div className="sidebar-banner wow fadeIn mb-lg-0 animated d-lg-block d-none">
                  <img src="/assets/imgs/banner/banner-12.png" alt="" />
                  <div className="banner-text">
                     <span className="text-muted font-sm">Watches</span>
                     <h4>
                        Save 17% <br />
                        on <span className="text-brand">Leather</span><br />
                        Watches
                     </h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </main>
  )
}

export default Shopproduct
