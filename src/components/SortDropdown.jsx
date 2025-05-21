import React from 'react';

const SortDropdown = ({ onSortChange }) => {
  const handleSelectChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-dropdown">
      <select onChange={handleSelectChange} className="form-select">
        <option value="Featured">Featured</option>
        <option value="Price: Low to High">Price: Low to High</option>
        <option value="Price: High to Low">Price: High to Low</option>
        <option value="Release Date">Release Date</option>
      </select>
    </div>
  );
};

export default SortDropdown;
