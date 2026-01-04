/**
 * Fetch products from API
 * Using fakestoreapi.com for better data quality
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    
    // Transform API data to match our needs
    return data.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      rating: product.rating,
      // Simulate stock - some products out of stock
      stock: product.id % 5 === 0 ? 0 : Math.floor(Math.random() * 20) + 5,
      inStock: product.id % 5 !== 0
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get unique categories from products
 */
export const getCategories = (products) => {
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
};

/**
 * Filter products based on search, category, and sort
 */
export const filterProducts = (products, filters) => {
  let filtered = [...products];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  // Sort by price
  if (filters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
};

/**
 * Format price with currency
 */
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

/**
 * Calculate cart total
 */
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

/**
 * Calculate total items in cart
 */
export const calculateTotalItems = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get cart item by product id
 */
export const getCartItem = (cartItems, productId) => {
  return cartItems.find(item => item.product.id === productId);
};
