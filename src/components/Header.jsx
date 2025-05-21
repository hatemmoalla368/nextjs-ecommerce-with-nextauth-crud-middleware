'use client'


import React, { useEffect, useState } from 'react'
import Script from 'next/script';
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useShoppingCart } from 'use-shopping-cart';
import Link from 'next/link';

const Header = ({categories}) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    
  
const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      window.location.href = "/login";
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const { cartDetails, incrementItem, decrementItem, removeItem, formattedTotalPrice, cartCount  } = useShoppingCart();

  

  const cartItems = Object.values(cartDetails || {});
   const buttonStyle = {
  background: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px',
  margin: '0 5px',
  width: '24px',
  height: '24px',
  lineHeight: '20px',
  textAlign: 'center',
  cursor: 'pointer'
};
 if (status === "loading") {
    return ;
  }
   const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = encodeURIComponent(formData.get("category").trim());
    const query = encodeURIComponent(formData.get("query").trim());
    
    router.push(`/search?category=${category}&query=${query}`);
  };

  
  return (
    <>
    
        <>
        

  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Best electronic shop</title>
  
  <meta name="description" content="" />
  <meta property="og:title" content="" />
  <meta property="og:type" content="" />
  <meta property="og:url" content="" />
  <meta property="og:image" content="" />
  
  
</>
      <header className="header-area header-style-1 header-height-2">
    <div className="header-border"></div>

    
    <div className="header-top d-none d-xl-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-4">
            <div className="header-info">
              <ul>
                <li>Welcome to the world wide best electronic shopping store</li>
              </ul>
            </div>
          </div>

          
    <div className="col-xl-9 col-lg-8">
      <div className="header-info header-info-right">
        <ul>
          <li>Need help? Call us: (+216) 24021594 or hatemmoalla368@gmail.com</li>
          <li><Link href="/myaccount">My Account</Link></li>

          {status === 'loading' ? (
            <li>Loading...</li>
          ) : session?.user ? (
            <>
              <li>
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    margin: 4, 
                    cursor: 'pointer',
                    color: 'gray'
                  }}
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login">Register or Sign in</Link></li>
          )}

          <li><Link href="/checkout">Checkout</Link></li>
        </ul>
      </div>
    </div>
  



        </div>
      </div>
    </div>

    
    <div className="header-middle d-none d-xl-block">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <Link href="/"><img src="/assets/imgs/theme/logo.svg" alt="logo" /></Link>
          </div>
          <div className="hotline">
            <img src="/assets/imgs/theme/icons/icon-headphone.svg" alt="hotline" />
            <p><span>24/7 Support Center</span> 24021594</p>
          </div>
          <div className="header-right">
             <div className="search-style-2">
      <form onSubmit={handleSearch}>
        <select name="category" className="select-active">
          <option value="All Categories">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          name="query"
          type="text"
          placeholder="Search for items..."
        />
        <button type="submit">Search</button>
      </form>
    </div>


            <div className="header-action-right">
              <div className="header-action">
                <div className="header-action-icon">
                  
                  <div className="account-icon-wrap">
      {session ? (
        <>
        <span className="label ml-0">
          Welcome, {session?.user?.firstName || 'Guest'}
          
        </span>
        <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                    <ul>
                      <li><Link href="/myaccount"><i className="fi fi-rs-user mr-10"></i>My Account</Link></li>
                      
                      
                  
                <li> <button 
                  onClick={handleLogout} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    margin: 4, 
                    cursor: 'pointer',
                    color: 'gray'
                  }}
                ><a ><i className="fi fi-rs-sign-out mr-10"></i>Sign out</a></button></li>
                    </ul>
                  </div>
                  </>
      ) : (
        <>
          <img className="svgInject" alt="Nest" src="/assets/imgs/theme/icons/icon-user.svg" />
          <span className="label ml-0">My Account</span>
        </>
      )}
    </div>
                  
                  
                </div>
                
                <div className="header-action-icon">
                  <Link className="mini-cart-icon" href="/cart">
                    <div className="cart-wish-icon-wrap">
                      <img alt="Nest" src="/assets/imgs/theme/icons/icon-cart.svg" />
                      <span className="pro-count blue">{cartCount || 0}</span>
                      <span className="label">Your Cart</span>
                    </div>
                  </Link>
                  <div className="cart-dropdown-wrap">
  <ul>
    {Object.values(cartDetails).length === 0 ? (
      <li className="text-center p-3">Your cart is empty</li>
    ) : (
      Object.values(cartDetails).map((item) => (
        <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '25px'  }}>
          <div className="shopping-cart-img">
            <Link href={`/products/${item.slug}`} className="border">
              <img alt={item.name} src={item.image} />
            </Link>
          </div>

          <div className="shopping-cart-title" style={{ flex: 1 }}>
            <h4><Link href={`/products/${item.slug}`}>{item.name}</Link></h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <button onClick={() => decrementItem(item.id)} style={buttonStyle}>−</button>
  <span>{item.quantity}</span>
  <button onClick={() => incrementItem(item.id)} style={buttonStyle}>+</button>
  <span>× ${(item.price / 100).toFixed(2)}</span>
</div>

          </div>

          <div className="shopping-cart-delete">
            <button
              onClick={() => removeItem(item.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: 'inherit'
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </li>
      ))
    )}
  </ul>

  {Object.values(cartDetails).length > 0 && (
    <div className="shopping-cart-footer">
      <div className="shopping-cart-total">
        <h4>Subtotal <span>{formattedTotalPrice}</span></h4>
      </div>
      <div className="shopping-cart-button">
        <Link href="/cart" className="outline">View cart</Link>
        <Link href="/checkout">Checkout</Link>
      </div>
    </div>
  )}
</div>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="header-bottom header-bottom-bg-color sticky-bar">
      <div className="container">
        <div className="header-wrapper header-space-between position-relative">
          <div className="logo logo-width-1 d-block d-xl-none">
            <Link href="/"><img src="/assets/imgs/theme/logo.svg" alt="logo" /></Link>
          </div>

          <div className="header-nav d-none d-xl-flex">

            <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
              <nav>
                <ul className="text-center">
                  <li>
                    <Link className="active" href="/">
                      Home Pages 
                    </Link>
                    
                  </li>
                  <li>
                    <Link href="shop.html">Shop </Link>
                    
                  </li>


                  {session?.user.role==="ADMIN" ? (
                    <li>
                    <Link href="/dashboard/categories">Dashboard <i className="fi-rs-angle-down"></i></Link>
                    <ul className="sub-menu">
                      
                      <li>
                        <Link href="/dashboard/categories">Categories<i className="fi-rs-angle-right"></i></Link>
                        <ul className="level-menu">
                         <li><Link href="/dashboard/categories">Category list</Link></li>

                          <li><Link href="/dashboard/categories/insertcategorie">Add a category</Link></li>
                          
                        </ul>
                      </li>
                     <li>
                        <Link href="/dashboard/products">Products<i className="fi-rs-angle-right"></i></Link>
                        <ul className="level-menu">
                          <li><Link href="/dashboard/products">Products list</Link></li>
                          <li><Link href="/dashboard/categories/insertproduct">Add a product</Link></li>
                          
                        </ul>
                      </li>
                      <li>
                        <Link href="/dashboard/orders">List of orders</Link>
                       
                      </li>
                      <li>
                        <Link href="/dashboard/users">List of users</Link>
                       
                      </li>
                      
                    </ul>
                  </li>
                  ): (
                    <>
                    </>
                  )

                  }

                  

                  

                </ul>
              </nav>
            </div>

          </div>

          

          </div>
      </div>
    </div>
  </header>
    </>
  )
}

export default Header
