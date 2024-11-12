import React from 'react';
import './FilterPanel.css';

const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <h2>Filters</h2>
      <input type="text" placeholder="Search by form name..." />
      <input type="date" placeholder="Start Date" />
      <input type="date" placeholder="End Date" />
    </div>
  );
};

export default FilterPanel;
