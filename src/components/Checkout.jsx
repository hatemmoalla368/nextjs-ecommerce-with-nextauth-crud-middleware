"use client"
import React, { useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import { useSession, signIn  } from 'next-auth/react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Checkout = () => {
      const router = useRouter(); // Initialize router

    const { data: session, status } = useSession();
      const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false); // Track successful order state

const [error, setError] = useState('');
    const { cartDetails, incrementItem, decrementItem, removeItem, formattedTotalPrice, cartCount, clearCart, totalPrice  } = useShoppingCart();
        
          const shippingFee = 1000; // $10 in cents
            const shippingCost = 1000; // Change to 1000 for $10 in cents if needed

      const totalWithShipping = (totalPrice + shippingFee) / 100;
            const cartItems = Object.values(cartDetails || {});
            const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber:'',
    address:''
  });

          
 

  
  

  
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCheckout = async () => {
            setError('');
    if (!cartDetails || Object.keys(cartDetails).length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!session) {
      // Not logged in — validate form first
      if (!form.firstName || !form.lastName || !form.email || !form.password) {
        setError("Please fill all fields");
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: Object.values(cartDetails),
          userInfo: session
            ? null
            : form, // if logged in, no userInfo needed
        }),
      });

      const data = await response.json();

      if (response.ok) {
      
      setOrderSuccess(true); // Set success state

      clearCart();
      setShowSuccessModal(true);
            } else {
                setError(data.error );
            }
        } 
        

      

      
      finally {
      setLoading(false);
    }
  };
const SuccessMessage = () => {
        if (!orderSuccess) return null;
        
        return (
            <div className="alert alert-success">
                Your order and registration are placed successfully! Please check your email for the account activation link.
            </div>
        );
    };
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    maxWidth: 400,
    width: "90%",
    textAlign: "center",
  },
};
  

  return (
    <main className="main single-page">
      <div className="page-header breadcrumb-wrap">
         <div className="container">
            <div className="breadcrumb">
               <Link href="/" rel="nofollow">Home</Link> 
               <span></span> Shop                
               <span></span> Checkout
            </div>
         </div>
      </div>

  {/* Show error if exists */}
            {error && <div className="alert alert-danger">{error}</div>}
            
            {/* Success message only shows after successful order */}
            <SuccessMessage />

      <section>
         <div className="container mb-80 mt-50">
            <div className="row">
               <div className="col-xl-11 m-auto">

                  <div className="row mb-30">
                     <div className="col-lg-6 mb-30">
                        
                        <div className="panel-collapse collapse" id="loginform">
                           <div className="panel-body">
                              
                              <form method="post" className="contact-form">
                                 <div className="row mb-10">
                                    <div className="col-lg-6 col-md-12">
                                       <p className="font-sm">Username</p>
                                       <div className="input-style mb-20">
                                          <input className="custom-input" name="email" placeholder="Enter username *" type="text" required/>
                                       </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                       <p className="font-sm">Password <span className="float-end"><Link href="/forgot-password">Forgot password?</Link></span></p>
                                       <div className="input-style mb-20">
                                          <input className="custom-input" name="password" placeholder="Enter 6 characters or more *" type="password" required/>
                                       </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                       <div className="custom-checkbox mb-20">
                                          <input className="form-check-input" type="checkbox" name="checkbox" id="checkbox1" value="" />
                                          <label className="form-check-label" ><span>Remember me</span></label>
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <button className="btn btn-sm" name="login">Log in</button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                     
                  </div>



                  <div className="row">
                     <div className="col-lg-7">  
                        {status === 'loading' ? (
            <h1>Loading...</h1>
          ) : session?.user ? (
<h1>you already logged in</h1>
) : (                
                        <div className="row">
                           <h5 className="mb-10">Billing Details</h5>
                           

                           <form onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
          style={{ marginBottom: 20 }} className="contact-form checkout">
                              <div className="row">
                                 

                                 <div className="col-lg-6 mb-20">
                                    <input className="custom-input" type="text"  name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={onChange}/>
                                 </div>
                                 <div className="col-lg-6 mb-20">
                                    <input className="custom-input" type="text" name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={onChange}/>
                                 </div>

                                 <div className="col-lg-6 mb-20">
                                    <input className="custom-input"  type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}/>
                                 </div>
                                 <div className="col-lg-6 mb-20">
                                    <input className="custom-input" 
            name="phoneNumber"
            placeholder="phone number"
            value={form.phoneNumber}
            onChange={onChange}/>
                                 </div>

                                 

                                 <div className="col-lg-12 mb-20">
                                    <input className="custom-input" 
            name="address"
            placeholder="address"
            value={form.address}
            onChange={onChange}/>
                                 </div>

                                 

                                 <div className="col-lg-6 mb-20">
                                    <input className="custom-input" type='password' name="password"
            placeholder="password"
            value={form.password}
            onChange={onChange}/>
                                 </div>

                                 
                              </div>

                              
                              
                           </form>

                        </div>
                        )}
                     </div>
                     
{Object.values(cartDetails).length > 0 ? (
                         <div className="col-lg-5">
      <div className="checkout-cart-totals box-shadow-outer-7">
        <div className="mb-20">
          <h5>Your Orders</h5>
        </div>
        <div className="table-responsive checkout-table text-center">
          {cartItems.length === 0 ? (
            <div className="text-center p-3">Your cart is empty</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th colSpan="2">Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="image product-thumbnail">
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>
                      <h5 className="title">
                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                      </h5>
                      <span className="product-qty">x {item.quantity}</span>
                    </td>
                    <td>${((item.price * item.quantity) / 100).toFixed(2)}</td>
                  </tr>
                ))}

                <tr>
                  <th>Subtotal</th>
                  <td className="product-subtotal" colSpan="2">
                    ${(totalPrice / 100).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td colSpan="2">
                    <em>{shippingCost === 0 ? 'Free Shipping' : `$${(shippingCost / 100).toFixed(2)}`}</em>
                  </td>
                </tr>
                <tr className="cart-total">
                  <th>Total</th>
                  <td colSpan="2" className="product-subtotal">
                    <span className="font-xl text-brand fw-900">
                      ${totalWithShipping.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Coupon form */}
        

        {/* Payment Method */}
        <div className="payment_method">
          
          <div className="mb-20">
            
            <div className="custom-radio">
              
              <p>Cash On Delivery</p>
            </div>
            
          </div>
        </div>

        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }} onClick={handleCheckout}><Link href="/" className="btn">Proceed to place order</Link></button>
      </div>
    </div>
):(
<div className="text-center p-3">Your cart is empty</div>
)}
                  </div>
                  

               </div>
            </div>
         </div>
      </section>
{showSuccessModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <h2>Order Placed!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
   </main>
  )
}

export default Checkout
