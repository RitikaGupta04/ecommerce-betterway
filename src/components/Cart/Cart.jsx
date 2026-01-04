import React from 'react';
import { formatPrice, calculateCartTotal, calculateTotalItems } from '../../utils/helpers';
import './Cart.css';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const totalItems = calculateTotalItems(cartItems);
  const totalPrice = calculateCartTotal(cartItems);

  const handleQuantityChange = (productId, newQuantity, maxStock) => {
    if (newQuantity < 1) return;
    if (newQuantity > maxStock) return;
    onUpdateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    onRemoveItem(productId);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{product.title}</h4>
                    <div className="cart-item-price">{formatPrice(product.price)}</div>
                    
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(product.id, quantity - 1, product.stock)}
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="quantity-display">{quantity}</span>
                        
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(product.id, quantity + 1, product.stock)}
                          disabled={quantity >= product.stock}
                          aria-label="Increase quantity"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(product.id)}
                        aria-label="Remove item"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      Subtotal: <strong>{formatPrice(product.price * quantity)}</strong>
                    </div>

                    {quantity >= product.stock && (
                      <div className="max-stock-warning">
                        Maximum stock reached
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total Items:</span>
                  <strong>{totalItems}</strong>
                </div>
                <div className="summary-row total">
                  <span>Total Price:</span>
                  <strong className="total-price">{formatPrice(totalPrice)}</strong>
                </div>
              </div>

              <button className="checkout-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
