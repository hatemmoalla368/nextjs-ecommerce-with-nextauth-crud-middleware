import React from 'react'

const Features = () => {
  return (
    <div>
      <section className="container mb-30">
      <div className="main-features">
        <div className="feature d-flex wow fadeIn animated">
          <div className="feature-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="feature-text">
            <h3 className="icon-box-title">Best prices & offers</h3>
            <p>Orders $50 or more</p>
          </div>
        </div>
        <div className="feature d-flex wow fadeIn animated">
          <div className="feature-icon">
            <i className="fas fa-car"></i>
          </div>
          <div className="feature-text">
            <h3 className="icon-box-title">Cheap delivery</h3>
            <p>24/7 amazing services</p>
          </div>
        </div>
        <div className="feature d-flex wow fadeIn animated">
          <div className="feature-icon">
            <i className="fas fa-life-ring"></i>
          </div>
          <div className="feature-text">
            <h3 className="icon-box-title">Online Support</h3>
            <p>We Have Support 24/7</p>
          </div>
        </div>
        <div className="feature d-flex wow fadeIn animated">
          <div className="feature-icon">
            <i className="fas fa-recycle"></i>
          </div>
          <div className="feature-text">
            <h3 className="icon-box-title">Guarantee</h3>
            <p>30 days money back</p>
          </div>
        </div>
        <div className="feature d-flex wow fadeIn animated border-0">
          <div className="feature-icon">
            <i className="fas fa-credit-card-alt"></i>
          </div>
          <div className="feature-text">
            <h3 className="icon-box-title">Cash on delivery</h3>
            <p>100% Secure payment</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Features
