import React, { useEffect, useState } from "react";
import { CardBody, Card, CardFooter } from "reactstrap";

import DataTable from "./components/DataTable/dataTable";
import Pagination from "./components/Pagination/pagination";
import PageLimit from "./components/Pagination/pageLimit";
import Nav from "./components/Nav/navBar";
import SearchBar from "./components/SearchBar/searchBar";

import "./App.css";

function App() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [sortBy, setSortBy] = useState("asc");

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        setItemsList(json);
        setFilteredItems(json);
        setLoading(false);
      });
  }, []);

  //current posts/data
  const lastIndex = currentPage * pageLimit;
  const firstIndex = lastIndex - pageLimit;
  const currentData = filteredItems.slice(firstIndex, lastIndex);

  //change page
  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  //delete item
  const deleteItem = e =>
    setFilteredItems(
      filteredItems.filter(item => item.id !== Number(e.target.id))
    );

  //update
  const updateItem = (e, field) => {
    const itemIndex = filteredItems.findIndex(item => item.id === Number(e.id));
    filteredItems[itemIndex][field] = e.innerText;
    setFilteredItems(filteredItems);
  };

  //change page limit
  const changePageLimit = value => {
    setPageLimit(value);
    setCurrentPage(1);
  };

  //onSearch
  const onSearch = e => {
    const filteredItems = [...itemsList];
    setFilteredItems(
      filteredItems.filter(item =>
        item.body.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  //sort
  const sort = key => {
    const items = [...itemsList];
    let sorted = [];
    if (sortBy === "desc") {
      setSortBy("asc");
      sorted = items.sort((a, b) =>
        key === "id" ? a[key] > b[key] : a[key].localeCompare(b[key])
      );
    } else {
      setSortBy("desc");
      sorted = items.sort((a, b) =>
        key === "id" ? a[key] > b[key] : b[key].localeCompare(a[key])
      );
    }
    setFilteredItems(sorted);
  };

  return (
    <div className="App">
      <Nav />
      <Card>
        <SearchBar onSearch={onSearch} />
        <CardBody>
          <DataTable
            data={currentData}
            loading={loading}
            deleteItem={deleteItem}
            updateItem={updateItem}
            sort={sort}
            sortBy={sortBy}
          />
        </CardBody>
        <CardFooter className="d-flex">
          <Pagination
            pageLimit={pageLimit}
            total={filteredItems.length}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
          <PageLimit changePageLimit={changePageLimit} pageLimit={pageLimit} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
