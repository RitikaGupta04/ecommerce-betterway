import React from 'react';
import { formatPrice } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = React.memo(({ product, onAddToCart, onProductClick, cartQuantity }) => {
  const { id, title, price, category, image, inStock, stock, rating } = product;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleClick = () => {
    onProductClick(product);
  };

  const canAddMore = inStock && (!cartQuantity || cartQuantity < stock);

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" loading="lazy" />
        {!inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        <div className="product-category-badge">{category}</div>
      </div>

      <div className="product-info">
        <h3 className="product-title" title={title}>{title}</h3>
        
        <div className="product-meta">
          {rating && (
            <div className="product-rating">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{rating.rate.toFixed(1)}</span>
            </div>
          )}
          <div className="product-stock">
            {inStock ? (
              <span className="stock-available">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {stock} in stock
              </span>
            ) : (
              <span className="stock-unavailable">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                Out of stock
              </span>
            )}
          </div>
        </div>

        <div className="product-footer">
          <div className="product-price">{formatPrice(price)}</div>
          <button
            className={`add-to-cart-btn ${!canAddMore ? 'disabled' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!canAddMore}
            aria-label={`Add ${title} to cart`}
          >
            {cartQuantity > 0 ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add More
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>

        {cartQuantity > 0 && (
          <div className="in-cart-indicator">
            {cartQuantity} in cart
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
