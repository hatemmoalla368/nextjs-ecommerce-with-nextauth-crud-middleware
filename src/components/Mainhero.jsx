"use client";
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Add this import
import Link from 'next/link';

const Mainhero = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Dynamic imports to ensure client-side only
    const initSlider = async () => {
      const $ = (await import('jquery')).default;
      await import('slick-carousel');

      if (sliderRef.current && !$(sliderRef.current).hasClass('slick-initialized')) {
        $(sliderRef.current).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          prevArrow: $('.slider-arrow-prev'),
          nextArrow: $('.slider-arrow-next'),
          dots: true,
          dotsClass: 'dot-style-1',
          autoplay: true,
          autoplaySpeed: 5000
        });
      }
    };

    initSlider();

    return () => {
      // Cleanup with dynamic imports
      const cleanup = async () => {
        const $ = (await import('jquery')).default;
        if (sliderRef.current && $(sliderRef.current).hasClass('slick-initialized')) {
          $(sliderRef.current).slick('unslick');
        }
      };
      cleanup();
    };
  }, []);

  return (
    <section className="container hero-main-container">
      <div className="row flex-row-reverse">
        <div className="col-lg-4-5">
          <section className="position-relative mb-30">
            <div className="hero-slide-wrapper">
              <div ref={sliderRef} className="hero-slider-inner dot-style-1 dot-style-1-position-1">
                {/* Slide 1 */}
                <div className="single-slider single-animation-wrap" 
                     style={{ backgroundImage: "url('/assets/imgs/slider/slider-4.png')" }}>
                  <div className="slider-content">
                    <h3>BEST CHOICE OF THE YEAR</h3>
                    <h1 className="display-2 mb-40">High-end phones & super deals</h1>
                    <h5>RAM 6-256GB / Full Accessories</h5>
                    <p className="mb-35">Save up to 50% off on your first order</p>
                    <Link href="/shop" className="button">Discover Now</Link>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="single-slider single-animation-wrap" 
                     style={{ backgroundImage: "url('/assets/imgs/slider/slider-6.png')" }}>
                  <div className="slider-content">
                    <h3>BEST CHOICE OF THE YEAR</h3>
                    <h1 className="display-2 mb-40">Discover the Future in Your Hands!</h1>
                    <h5>RAM 6-256GB / Full Accessories</h5>
                    <p className="mb-35">Save up to 50% off on your first order</p>
                    <Link href="/shop" className="button">Discover Now</Link>
                  </div>
                </div>
              </div>
              
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

// Export with no SSR
export default dynamic(() => Promise.resolve(Mainhero), {
  ssr: false
});