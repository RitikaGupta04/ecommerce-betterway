import React, { useEffect } from 'react';
import { formatPrice } from '../../utils/helpers';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose, onAddToCart, cartItem }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;
  const isOutOfStock = !product.inStock || product.stock === 0;
  const canAddMore = !isOutOfStock && cartQuantity < product.stock;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-image-section">
            <div className="modal-image-container">
              <img src={product.image} alt={product.title} />
            </div>
            {product.rating && (
              <div className="modal-rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      fill={i < Math.round(product.rating.rate) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="modal-info-section">
            <div className="modal-category">{product.category}</div>
            <h2 className="modal-title">{product.title}</h2>
            
            <div className="modal-price-section">
              <div className="modal-price">{formatPrice(product.price)}</div>
              {isOutOfStock ? (
                <div className="modal-stock out-of-stock">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Out of Stock
                </div>
              ) : (
                <div className="modal-stock in-stock">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {product.stock} in stock
                </div>
              )}
            </div>

            <p className="modal-description">{product.description}</p>

            <div className="modal-features">
              <div className="modal-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="modal-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="modal-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>Easy Returns</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className={`modal-add-to-cart ${isInCart ? 'in-cart' : ''} ${!canAddMore ? 'disabled' : ''}`}
                onClick={() => canAddMore && onAddToCart(product)}
                disabled={!canAddMore}
              >
                {isOutOfStock ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Out of Stock</span>
                  </>
                ) : isInCart ? (
                  cartQuantity >= product.stock ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Max Quantity in Cart ({cartQuantity})</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add More ({cartQuantity} in cart)</span>
                    </>
                  )
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
