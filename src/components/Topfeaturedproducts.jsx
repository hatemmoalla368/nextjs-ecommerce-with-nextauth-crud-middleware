"use client"
import Link from 'next/link';
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';

const Topfeaturedproducts = ({topproducts}) => {
  const {
      addItem,
    } = useShoppingCart();
  const handleAddToCartrelated = (product) => {
  addItem({
    id: product.id,
    name: product.name,
    price: product.price * 100,
    currency: 'USD',
    image: product.images,
    slug:product.slug

  }, { quantity: 1 });
};
  
  return (
    <div>
         <div className="mt-60 mb-30">
  <h2 className="section-title style-1 mb-30">Related products</h2>
  <div className="related-products-container"> {/* Add this wrapper */}
    {topproducts.map((related) => (
      <div key={related.id} className="related-product-item"> {/* Add className */}
        <div className="product">
          <div className="product-wrapper style-2">
              <div className="product-wrapper style-2">
                <div className="product-content product-content-wrap">
                  <div className="thumbnail-wrapper">
                    <div className="product-img product-img-zoom">
                      <Link href={`/products/${related.slug}`}>
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
  )
}

export default Topfeaturedproducts
