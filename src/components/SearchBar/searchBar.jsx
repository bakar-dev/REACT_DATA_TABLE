import React, { Fragment } from "react";
import { Input } from "reactstrap";

const SearchBar = ({ onSearch }) => {
  return (
    <Fragment>
      <Input placeholder="Search here" onChange={onSearch} />
    </Fragment>
  );
};

export default SearchBar;
