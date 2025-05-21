import React from 'react'

const Topsellingproducts = () => {
  return (
    <div>
      <section className="mb-40">
      <div className="container">
        <div className="module-header with-border">
          <h5>Top Selling Products</h5>
          <nav className="module-tab-links style-1">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-bs-toggle="tab" href="#tab-one" id="24">Computer &amp; Desktop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-two" id="32">Phone Accessories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-three" id="70">Tablets & Ipads</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-four" id="49">Cameras</a>
              </li>
            </ul>
          </nav>
          <a className="tab-btn d-flex d-lg-none" href="#">
            View All <i className="fas fa-long-arrow-right"></i>
          </a>
        </div>

        
        <div className="row">
          <div className="col-lg-2 d-none d-lg-flex wow animate__animated animate__fadeIn" data-wow-delay=".2s">
            <div className="banner-img style-2">
              <div className="banner-text">
                <h5 className="mb-30 text-muted">Explore Innovation, Embrace Technology!</h5>
                <a href="shop.html">
                  Shop Now <i className="fi-rs-arrow-small-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-10 col-md-12 wow animate__animated animate__fadeIn" data-wow-delay=".4s">
            <div className="tab-content" id="myTabContent">

              
              <div className="tab-pane fade show active" id="tab-one" role="tabpanel" aria-labelledby="tab-one">
                <div className="carausel-4-columns-cover arrow-center position-relative">
                  <div className="slider-arrow slider-arrow-2 carausel-4-columns-arrow" id="carausel-4-columns-arrows">
                  </div>

                  <div className="product-flex-wrapper-1">

                    <div className="product wow animate__animated animate__fadeIn" data-wow-delay=".2s">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/headphones_a_1.webp" alt="#" />
                                <img className="hover-img" src="/assets/imgs/electronics/headphones_a_2.webp" alt="#" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 hot">Hot</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Audio speakers</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">Echo Pro Wireless Headphones</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>350.00</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>249.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/speaker1.webp" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/speaker2.webp" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 sale">-5% Sale</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat font-xxs">Bluetooth speakers</span>
                            <h3 className="product-title">
                              <a href="#">SymphonyX Portable Speaker</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>268.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>249.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product wow animate__animated animate__fadeIn" data-wow-delay=".4s">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/digital_04.jpg" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/digital_14.jpg" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 top">Top sale</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Laptops</span>
                            <h3 className="product-title">
                              <a href="#">Quantum VisionaryMax UltraLap Pro</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>899.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>549.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/digital_07.jpg" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/digital_07.jpg" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 new">New</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat font-xxs">Digital camera</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">VisionMax PulseCapture UltraVision</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>268.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>249.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product wow animate__animated animate__fadeIn" data-wow-delay=".6s">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/headphones_b_1.webp" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/headphones_b_2.webp" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 best">Best</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat font-xss">Headphones</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">Sonic EliteSound ProBeat AudioFlex</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>199.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>119.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/earphones_b_1.webp" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/earphones_b_3.webp" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 sale">-2% Sale</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Audio speakers</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">SonicBlast FlexiFit Pro Ear Bluetooth</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>69.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>49.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              
              <div className="tab-pane fade show" id="tab-two" role="tabpanel" aria-labelledby="tab-two">
                <div className="carausel-4-columns-cover arrow-center position-relative">
                  <div className="slider-arrow slider-arrow-2 carausel-4-columns-arrow" id="carausel-4-columns-arrows">
                  </div>

                  <div className="product-flex-wrapper-1">

                    <div className="product">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/headphones_c_2.webp" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/headphones_c_1.webp" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 new">New</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Headphones</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">SonicSurge PulsePro IntraHarmony EarTech</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>168.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>149.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/headphones_b_1.webp" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/headphones_b_2.webp" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 best">Best</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Headphones</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">SonicSphere EliteSound ProBeat AudioFlex</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>199.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>119.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/digital_10.jpg" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/digital_18.jpg" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 sale">-10% sale</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Gamepads</span>
                            <h3 className="product-title">
                              <a href="#">X-box VitaPulse OmniTech Ultimate Pads</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>399.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>299.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/digital_01.jpg" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/digital_02.jpg" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 hot">Hot</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Smart phones</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">VisionSphere PulseSync HarmonyMax</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>268.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>249.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/watch_2.webp" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/watch_4.webp" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 top">Top product</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Smart watches</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">ChronoPro Visionary Smart Timepiece</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>99.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>89.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product">
                      <div className="product-wrapper style-1">
                        <div className="product-content product-content-wrap">
                          <div className="thumbnail-wrapper">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product.html">
                                <img className="default-img" src="/assets/imgs/electronics/digital_09.jpg" alt="" />
                                <img className="hover-img" src="/assets/imgs/electronics/digital_20.jpg" alt="" />
                              </a>
                            </div>
                            <div className="product-buttons-1 d-lg-none">
                              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html"><i
                                  className="fi-rs-heart"></i></a>
                              <a aria-label="Compare" className="action-btn" href="shop-compare.html"><i
                                  className="fi-rs-shuffle"></i></a>
                              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
                            </div>
                            <div className="product-badge">
                              <span className="badge style-1 best">Best</span>
                            </div>
                          </div>
                          <div className="content-wrapper">
                            <span className="product-cat">Android TV</span>
                            <h3 className="product-title">
                              <a href="shop-product.html">ZenithSync HarmonyLink ChronoElite TV</a>
                            </h3>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: "90%" }}></div>
                              </div>
                              <span className="font-small ml-5 text-muted"> (4.8)</span>
                            </div>
                            <div className="product-cart-form">
                              <span className="price">
                                <del aria-hidden="true">
                                  <span className="amount-x">
                                    <bdi><span>&#36;</span>468.99</bdi>
                                  </span>
                                </del>
                                <span className="amount">
                                  <bdi><span>&#36;</span>359.99</bdi>
                                </span>
                              </span>
                              <a href="#" className="button"><i className="fi-rs-shopping-bag-add"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    </div>
  )
}

export default Topsellingproducts
