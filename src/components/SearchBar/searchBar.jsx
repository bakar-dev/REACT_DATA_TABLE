import React, { Fragment } from "react";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="searchContainer">
      <input
        className="searchInput"
        placeholder="Search here..."
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;
