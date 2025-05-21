'use client'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
       <footer className="footer">
    <section className="newsletter mb-15">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="position-relative newsletter-inner">
              <div className="newsletter-content">
                <div className="newsletter-text">
                    
                  
                  
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="section-padding footer-middle">
      <div className="container pt-15 pb-20">
        <div className="row gap-0">
          <div className="col-lg-3 col-md-12">
            <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0">
              <div className="logo mb-30">
                <Link href="index.html" className="mb-15"><img src="/assets/imgs/theme/logo.svg" alt="logo" /></Link>
                <p className="font-md text-heading">Best ecommerce electronic shop</p>
              </div>
              <ul className="contact-infor">
                <li>
                  <i className="fas fa-map-marker-alt"></i> <strong>Address: </strong>
                  <span>Route Manzel chaker klm 5.5</span>
                </li>
                <li><i className="fas fa-headphones"></i> <strong>Call Us:</strong> <span>(+216) 24021594</span></li>
                <li><i className="fas fa-envelope"></i> <strong>Email:</strong> <span>hatemmoalla368@gmail.com</span></li>
                <li><i className="fas fa-clock"></i> <strong>Hours:</strong> <span>10:00 - 18:00, Mon - Sat</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-link-widget col-lg-2 col-md-4">
            <h4 className="widget-title">Company</h4>
            <ul className="footer-list">
              <li><Link href="/">About Us</Link></li>
              <li><Link href="/">Delivery Information</Link></li>
              <li><Link href="/">Privacy Policy</Link></li>
              <li><Link href="/">Terms &amp; Conditions</Link></li>
              <li><Link href="/">Contact Us</Link></li>
              <li><Link href="/">Support Center</Link></li>
              <li><Link href="/">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-link-widget col-lg-2 col-md-4">
            <h4 className="widget-title">Account</h4>
            <ul className="footer-list">
              <li><Link href="/">Sign In</Link></li>
              <li><Link href="/">View Cart</Link></li>
              <li><Link href="/">My Wishlist</Link></li>
              <li><Link href="/">Track My Order</Link></li>
              <li><Link href="/">Help Ticket</Link></li>
              <li><Link href="/">Shipping Details</Link></li>
              <li><Link href="/">Compare products</Link></li>
            </ul>
          </div>
          <div className="footer-link-widget col-lg-2 col-md-4">
            <h4 className="widget-title">Help & Guides</h4>
            <ul className="footer-list">
              <li><Link href="/">Help Center</Link></li>
              <li><Link href="/">Return policy</Link></li>
              <li><Link href="/">Purchase guide</Link></li>
              <li><Link href="/">Cookie policy</Link></li>
              <li><Link href="/">Help Ticket</Link></li>
              <li><Link href="/">Buy gift cards</Link></li>
              <li><Link href="/">Register today</Link></li>
            </ul>
          </div>
          <div className="footer-link-widget widget-install-appdd col-lg-3 col-md-12">
            <h4 className="widget-title">Download App on Mobile</h4>
            <p className="wow fadeIn animated">From App Store or Google Play</p>
            <div className="download-app">
              <Link href="/" className="hover-up mb-sm-2 mb-lg-0">
                <img className="active" src="/assets/imgs/theme/app-store.jpg" alt="app-store" />
              </Link>
              <Link href="/" className="hover-up mb-sm-2"><img src="/assets/imgs/theme/google-play.jpg" alt="google play" /></Link>
            </div>
            <p className="mb-20">Secured Payment Gateways</p>
            <img className="wow fadeIn animated" src="/assets/imgs/theme/payment-method.png" alt="payment" />
          </div>
        </div>
      </div>
    </section>

    
    <div className="container pb-20">
      <div className="row align-items-center">
        <div className="col-12 mb-30">
          <div className="footer-bottom"></div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
          <p className="font-sm mb-0">&copy; 2023,
            <strong className="text-brand">JabKart</strong> - HTML Bootstrap Ecommerce Template.
            All rights reserved
          </p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 text-end d-none d-md-block">
          <div className="mobile-social-icon">
            <h6>Follow Us</h6>
            <Link href="/" className="fb"><img src="/assets/imgs/theme/icons/icon-facebook-white.svg" alt="icons" /></Link>
            <Link href="/" className="twit"><img src="/assets/imgs/theme/icons/icon-twitter-white.svg" alt="icons" /></Link>
            <Link href="/" className="insta"><img src="/assets/imgs/theme/icons/icon-instagram-white.svg" alt="icons" /></Link>
            <Link href="/" className="pin"><img src="/assets/imgs/theme/icons/icon-pinterest-white.svg" alt="icons" /></Link>
            <Link href="/" className="utube"><img src="/assets/imgs/theme/icons/icon-youtube-white.svg" alt="icons" /></Link>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <div className="mobile-bottom-nav">
    <ul>
      <li><Link href="/" className="active"><i className="fi-rs-home"></i><span>Home</span></Link></li>
      <li><Link href="/shop"><i className="fi-rs-box"></i><span>Shop Now</span></Link></li>
      <li><Link href="/cart"><i className="fi-rs-shopping-bag"></i> <span>Cart</span> </Link></li>
      <li><Link href="/myaccount"><i className="fi-rs-user"></i><span>Account</span></Link></li>
    </ul>
  </div>
    </div>
  )
}

export default Footer
