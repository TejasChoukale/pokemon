// src/components/SearchBar.js
import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, selectedType, setSelectedType, allTypes }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="type-select"
      >
        <option value="">All Types</option>
        {allTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
