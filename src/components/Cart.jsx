"use client"
import Link from 'next/link';
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';

const Cart = () => {
    const { cartDetails, incrementItem, decrementItem, removeItem, formattedTotalPrice, cartCount, clearCart, totalPrice  } = useShoppingCart();
    
      const shippingFee = 1000; // $10 in cents
  const totalWithShipping = (totalPrice + shippingFee) / 100;
    
      const cartItems = Object.values(cartDetails || {});
  return (
    <main className="main single-page">
      
      <div className="page-header breadcrumb-wrap">
         <div className="container">
            <div className="breadcrumb">
               <Link href="/" rel="nofollow">Home</Link> 
               <span></span> Shop                
               <span></span> Cart
            </div>
         </div>
      </div>


      <section>
         <div className="container mb-80 mt-10">
            <div className="row">
               <div className="col-xl-12 m-auto">
                  <div className="row">
                     <div className="col-lg-9 mb-30">                  
                        <h5>Your cart</h5>
<p className="font-sm">
      There {cartCount === 1 ? 'is' : 'are'}{' '}
      <span className="text-brand">{cartCount}</span>{' '}
      {cartCount === 1 ? 'item' : 'items'} in your cart
    </p>
                        <div className="table-responsive">
                           {Object.values(cartDetails).length === 0 ? (
  <div className="text-center p-3">Your cart is empty</div>
) : (
  <table className="table clean cart-table">
    <thead>
      <tr className="main-heading">
        <th scope="col">Image</th>
        <th scope="col">Product</th>
        <th scope="col"><span className="d-none d-md-block">Price</span></th>
        <th scope="col">Quantity</th>
        <th scope="col"><span className="d-none d-md-block">Subtotal</span></th>
      </tr>
    </thead>
    <tbody>
      {Object.values(cartDetails).map((item) => (
        <tr key={item.id}>
          <td className="image product-thumbnail">
            <img src={item.image} alt={item.name} />
          </td>
          <td>
            <h5 className="product-name font-sm">
              <Link href={`/products/${item.slug}`}>{item.name}</Link>
            </h5>
          </td>
          <td className="d-nonedd">
            <span className="d-none d-md-block">${(item.price / 100).toFixed(2)}</span>
          </td>
          <td className="text-centerdd">
            <div className="qtty-container cart">
              <div className="qty-btns radius">
                <button
                  onClick={() => decrementItem(item.id)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="qty-val">{item.quantity}</span>
                <button
                  onClick={() => incrementItem(item.id)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </td>
          <td>
            <span className="d-none d-md-block">
              ${(item.price * item.quantity / 100).toFixed(2)}
              <button
                onClick={() => removeItem(item.id)}
                className="float-end"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
              >
                <i className="fi-rs-trash"></i>
              </button>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

                        </div>

                        <div className="row mt-10">
                           <div className="col-md-7 mb-10">
                              
                           </div>

                           <div className="col-md-5 mb-10">
                             {Object.values(cartDetails).length > 0 && (
  <button
    onClick={() => clearCart()} // Clears the cart
    className="btn float-end"
    style={{ backgroundColor: '#FF4D4F', color: 'white' }} // Optional: styling for the button
  >
    Clear cart
  </button>
                             )}
</div>

                        </div>
                     </div>

                      <div className="col-lg-3 mb-30">
      <div className="cart-totals box-shadow-outer-7">
        <div className="mb-20">
          <h5>CART TOTALS</h5>
        </div>
        <div className="table-responsive">
          <table className="table clean">
            <tbody>
              <tr>
                <td className="text-left p-0">Subtotal</td>
                <td><span className="float-end">${(totalPrice / 100).toFixed(2)}</span></td>
              </tr>
              <tr>
                <td className="image product-thumbnail">Shipping</td>
                <td>
                  <ul>
                    <li>
                      <p className="text-muted font-sm">Shipping fee: $10.00</p>
                    </li>
                    <li className="mt-20">
                      <p className="text-muted font-xs font-sm text-info">
                        <Link href="#">Change address</Link>
                      </p>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr className="cart-total">
                <th>Total</th>
                <td>
                    {Object.values(cartDetails).length > 0 ? (
                  <span className="font-xl text-brand fw-900 float-end">
                    ${totalWithShipping.toFixed(2)}
                  </span>
                    ):(
                        <span className="font-xl text-brand fw-900 float-end">
                    $0
                  </span>

                    )}
                
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link href="/checkout" className="btn">Proceed to checkout</Link>
      </div>
    </div>
                  </div>

               </div>
            </div>
         </div>
      </section>

   </main>
  )
}

export default Cart
