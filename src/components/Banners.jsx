import Link from 'next/link'
import React from 'react'

const Banners = () => {
  return (
    <div>
      <section className="banners container mb-40">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-3 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
          <div className="banner-wrap">
            <img src="/assets/imgs/banner/banner-iphone.png" alt="banner" />
            <div className="banner-text">
              <p className="text-muted font-sm">Smart Phones</p>
              <h5>The Future in Your  Hands with Our Smartphones</h5>
              <p className="mb-20 mt-10 font-sm text-muted">Price: $298.99</p>
              <Link href="/shop" className="banner-btn">
                Order Now <i className="fi-rs-arrow-small-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3 wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
          <div className="banner-wrap">
            <img src="/assets/imgs/banner/banner-headphone-2.png" alt="banner" />
            <div className="banner-text">
              <p className="text-muted font-sm">Big Sale 30%</p>
              <h5>Immerse Yourself in  Pure Sound - Every Moment</h5>
              <p className="mb-20 mt-10 font-sm text-muted">Price: $99.99</p>
              <Link href="/shop" className="banner-btn">
                Order Now <i className="fi-rs-arrow-small-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-none d-lg-flex wow animate__animated animate__fadeInUp" data-wow-delay=".4s">
          <div className="banner-wrap mb-sm-0">
            <img src="/assets/imgs/banner/banner-camera-2.png" alt="banner" />
            <div className="banner-text">
              <p className="font-sm text-muted">Top Sale</p>
              <h5>Capture Life's Brilliance:  Redefine Photography</h5>
              <p className="mb-20 mt-10 font-sm text-muted">Price: $29.99</p>
              <Link href="/shop" className="banner-btn">
                Order Now <i className="fi-rs-arrow-small-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Banners
