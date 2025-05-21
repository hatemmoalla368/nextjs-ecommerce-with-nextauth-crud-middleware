// components/PriceRangeFilter.jsx
'use client';
import { useEffect, useState, useRef } from 'react';
import JQueryInitializer from './JQueryInitializer';

export default function PriceRangeFilter({ products, onPriceChange }) {
  const sliderRef = useRef(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Calculate price range from products
  useEffect(() => {
    if (products?.length > 0) {
      const prices = products.map(p => p.price);
      setMinPrice(Math.floor(Math.min(...prices)));
      setMaxPrice(Math.ceil(Math.max(...prices)));
    }
  }, [products]);

  // Initialize slider
  useEffect(() => {
    const initializeSlider = () => {
      if (window.$ && sliderRef.current) {
        // Destroy previous instance if exists
        if ($(sliderRef.current).hasClass('ui-slider')) {
          $(sliderRef.current).slider('destroy');
        }

        // Create new slider
        $(sliderRef.current).slider({
          range: true,
          min: minPrice,
          max: maxPrice,
          values: [minPrice, maxPrice],
          slide: function(event, ui) {
            $('#slider-range-value1').text('$' + ui.values[0]);
            $('#slider-range-value2').text('$' + ui.values[1]);
            onPriceChange(ui.values);
          }
        });

        // Set initial display values
        $('#slider-range-value1').text('$' + minPrice);
        $('#slider-range-value2').text('$' + maxPrice);
      }
    };

    // Wait for jQuery to be fully loaded
    if (typeof window !== 'undefined' && !window.$) {
      const timer = setInterval(() => {
        if (window.$) {
          clearInterval(timer);
          initializeSlider();
        }
      }, 100);
    } else {
      initializeSlider();
    }
  }, [minPrice, maxPrice, onPriceChange]);

  return (
    <>
      <JQueryInitializer />
      <div className="shop-widget price_range range mb-30 pr-15">
        <h4 className="widget-title">Filter by price</h4>
        <div className="price-filter mb-20">
          <div className="price-filter-inner">
            <div id="slider-range" ref={sliderRef} className="mb-20"></div>
            <div className="d-flex justify-content-between">
              <div className="caption">
                From: <strong id="slider-range-value1" className="text-brand"></strong>
              </div>
              <div className="caption">
                To: <strong id="slider-range-value2" className="text-brand"></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}