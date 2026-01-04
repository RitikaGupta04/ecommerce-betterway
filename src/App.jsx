import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Cart from './components/Cart/Cart';
import ProductModal from './components/ProductModal/ProductModal';
import Loading from './components/Loading/Loading';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  fetchProducts, 
  getCategories, 
  filterProducts,
  calculateTotalItems,
  getCartItem
} from './utils/helpers';
import './App.css';

function App() {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'default'
  });

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    return getCategories(products);
  }, [products]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  // Calculate total cart items
  const totalCartItems = useMemo(() => {
    return calculateTotalItems(cartItems);
  }, [cartItems]);

  // Handler for filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handler for adding product to cart
  const handleAddToCart = useCallback((product) => {
    setCartItems(prevCart => {
      const existingItem = getCartItem(prevCart, product.id);
      
      if (existingItem) {
        // Check if we can add more
        if (existingItem.quantity >= product.stock) {
          return prevCart; // Don't add if stock limit reached
        }
        
        // Increment quantity
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  }, []);

  // Handler for updating cart item quantity
  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevCart => {
      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  }, []);

  // Handler for removing item from cart
  const handleRemoveItem = useCallback((productId) => {
    setCartItems(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  // Handler for toggling cart
  const handleToggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  // Handler for closing cart
  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Handler for opening product modal
  const handleOpenModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  // Handler for closing product modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Header 
        cartItemCount={totalCartItems}
        onCartClick={handleToggleCart}
      />
      
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
      />

      <main className="main-content">
        <div className="products-header">
          <h2 className="products-title">
            {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onProductClick={handleOpenModal}
          cartItems={cartItems}
        />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
        cartItem={selectedProduct ? getCartItem(cartItems, selectedProduct.id) : null}
      />

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 Elite Store. Built with React & 🤍</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
