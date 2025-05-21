"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import SortDropdown from './SortDropdown';
import { useShoppingCart } from 'use-shopping-cart';
import Link from 'next/link';


const Shop = ({products, productstotal, categories}) => {
    const [currentPage, setCurrentPage] = useState(1);
  const { addItem } = useShoppingCart()

const itemsPerPage = 9; // Define how many items you want to show per page
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortType, setSortType] = useState("Featured");
  const handlePageChange = (page) => {
  setCurrentPage(page);
};
  // Apply all filters when any filter criteria change
  useEffect(() => {
  setIsLoading(true);

  let filtered = [...products];

  // Filter by categories
  filtered = filtered.filter(product => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
    const matchPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchCategory && matchPrice;
  });

  // Sort by selected sort type
  if (sortType === 'Price: Low to High') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortType === 'Price: High to Low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortType === 'Release Date') {
    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }

  // Pagination: Slice the filtered products based on current page and items per page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

  setFilteredProducts(currentProducts);
  setIsLoading(false);
}, [selectedCategories, priceRange, sortType, products, currentPage]);

const totalPages = Math.ceil(products.length / itemsPerPage);


  // Handle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSortChange = (type) => {
    setSortType(type);
  };

  // Price range slider handlers
  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      min: newMin > prev.max ? prev.max : newMin,
    }));
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      max: newMax < prev.min ? prev.min : newMax,
    }));
  };

 const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price * 100, // price must be in cents for use-shopping-cart
      currency: 'USD',
      image: product.images,
      slug:product.slug
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
      {filteredProducts.length} {/* Changed from productstotal */}
    </strong> 
    {filteredProducts.length === 1 ? 'item' : 'items'} for you!
    {selectedCategories.length > 0 && (
      <span className="text-muted small ms-2">
        (Filtered from {productstotal} total products)
      </span>
    )}
  </p>
</div>

                  <div className="sort-by-product-area">
                <div className="sort-by-cover mr-10">
                  <div className="sort-by-product-wrap"></div>
                </div>
                <div className="sort-by-cover">
                  <div className="sort-by-product-wrap">
                    <div className="sort-by">
                      <span>
                        <i className="fi-rs-apps-sort"></i>
                        <span className="d-none d-md-inline">Sort by:</span>
                      </span>
                    </div>
                    <SortDropdown onSortChange={handleSortChange} />
                  </div>
                </div>
              </div>
            
            
            

               </div>
    <div className="row product-grid">
  {filteredProducts.map((product) => (
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


               
                    <div className="pagination-area mt-20 mb-20">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-start">
                <li className="page-item">
                  <Link
                    className="page-link"
                    href="/"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fi-rs-arrow-small-left"></i>
                  </Link>
                </li>

                {[...Array(totalPages).keys()].map(page => (
                  <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                    <Link
                      className="page-link"
                      href="/"
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </Link>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fi-rs-arrow-small-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        

            </div>


            <div className="col-lg-3 shop-sidebar sticky-sidebar pr-40 mb-20">
               <div className="row">

                               

                  <div className="col-md-6 col-lg-12">
  <div className="shop-widget mb-30">
    <h4 className="widget-title">Product Categories</h4>
    
    {categories.map((category) => (
      <div key={category.id} className="custom-checkbox">
        <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cat-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <label className="form-check-label" htmlFor={`cat-${category.id}`}>
                    {category.name} ({products.filter(p => p.categoryId === category.id).length})
                  </label>
      </div>
    ))}
  </div>
</div>

                  
                 
    <div className="col-md-6 col-lg-12">
      <div className="shop-widget price_range range mb-30 pr-15">
        <h4 className="widget-title">Filter by price</h4>
        <div className="price-filter mb-20">
          <div className="price-filter-inner">

            {/* Min and Max Range Sliders */}
            <div className="d-flex flex-column gap-2">
  <input
    type="range"
    min="0"
    max="10000"
    value={priceRange.min}
    onChange={handleMinChange}
  />
  <input
    type="range"
    min="0"
    max="10000"
    value={priceRange.max}
    onChange={handleMaxChange}
  />
</div>




            {/* Display Values */}
            <div className="d-flex justify-content-between mt-2">
              <div className="caption">
                From: <strong className="text-brand">${priceRange.min}</strong>
              </div>
              <div className="caption">
                To: <strong className="text-brand">${priceRange.max}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                  
                  
               </div>
               
               
               
               
               <div className="sidebar-banner wow fadeIn mb-lg-0 animated d-lg-block d-none">
                  <img src="/assets/imgs/banner/banner-12.png" alt="" />
                  <div className="banner-text">
                     <span className="text-muted">Watches</span>
                     <h4>
                        Save 17% <br />
                        on <span className="text-brand">Smart</span><br />
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

export default Shop
