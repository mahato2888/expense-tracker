import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onFilterChange }) => {
  return (
    <div className="category-filter">
      <button onClick={() => onFilterChange('all')} className={selectedCategory === 'all' ? 'active' : ''}>
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={selectedCategory === cat ? 'active' : ''}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
