import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart, onProductClick, cartItems }) => {
  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2>No Products Found</h2>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
            cartQuantity={getCartQuantity(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
