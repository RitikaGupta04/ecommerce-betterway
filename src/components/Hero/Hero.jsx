import React from 'react';
import './Hero.css';

const Hero = ({ onScrollToProducts }) => {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>New Arrivals</span>
            </div>
            
            <h1 className="hero-title">
              Discover Your
              <span className="hero-title-gradient"> Perfect Style</span>
            </h1>
            
            <p className="hero-description">
              Explore our curated collection of premium products. From electronics to fashion, 
              find everything you need to elevate your lifestyle.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Premium Products</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">4.8</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
            </div>

            <div className="hero-actions">
              <button className="hero-btn-primary" onClick={onScrollToProducts}>
                <span>Shop Collection</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-grid">
              <div className="hero-image-item hero-image-large">
                <img 
                  src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" 
                  alt="Mens Casual Premium Slim Fit T-Shirts"
                  loading="eager"
                />
                <div className="image-overlay">
                  <span className="image-tag">Men's Clothing</span>
                </div>
              </div>
              
              <div className="hero-image-item hero-image-medium">
                <img 
                  src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" 
                  alt="John Hardy Women's Legends Naga Bracelet"
                  loading="eager"
                />
                <div className="image-overlay">
                  <span className="image-tag">Jewelery</span>
                </div>
              </div>
              
              <div className="hero-image-item hero-image-small">
                <img 
                  src="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg" 
                  alt="WD 2TB Elements Portable External Hard Drive"
                  loading="eager"
                />
                <div className="image-overlay">
                  <span className="image-tag">Electronics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
