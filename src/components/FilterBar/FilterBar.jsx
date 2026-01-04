import React from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange, categories }) => {
  const [searchInput, setSearchInput] = React.useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  React.useEffect(() => {
    onFilterChange({ ...filters, search: debouncedSearch });
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    onFilterChange({ search: '', category: 'all', sortBy: 'default' });
  };

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.sortBy !== 'default';

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-group search-group">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            {searchInput && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchInput('')}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="category" className="filter-label">Category</label>
          <select
            id="category"
            className="filter-select"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort" className="filter-label">Sort By</label>
          <select
            id="sort"
            className="filter-select"
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
