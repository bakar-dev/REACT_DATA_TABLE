import React, { Fragment } from "react";
import "./pagination.css";

export default function Pagination({
  total,
  pageLimit,
  onPageChange,
  currentPage
}) {
  const pageNumbers = [];
  let renderPageNumbers;

  //change page with left, right keys
  const onKeyDown = e => {
    if (e.keyCode === 39 && currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
    if (e.keyCode === 37 && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  //render page numbers
  if (total !== null) {
    for (let i = 1; i <= Math.ceil(total / pageLimit); i++) {
      pageNumbers.push(i);
    }
    renderPageNumbers = pageNumbers.map(number => {
      return (
        <div
          key={number}
          suppressContentEditableWarning={true}
          contentEditable={true}
          onKeyDown={e => onKeyDown(e)}
        >
          <span
            id={number}
            contentEditable={false}
            className={`${currentPage === number ? "active" : ""}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </span>
        </div>
      );
    });
  }

  //check activeness of first & last button
  let firstPageButtonClassName = currentPage <= 1 ? "disabled" : "";
  let lastPageButtonClassName =
    currentPage >= pageNumbers.length ? "disabled" : "";

  return (
    <Fragment>
      <div className="pagination mr-auto selectable">
        <span
          className={firstPageButtonClassName}
          onClick={() => onPageChange(1)}
        >
          &laquo;
        </span>
        {renderPageNumbers}
        <span
          className={lastPageButtonClassName}
          onClick={() => onPageChange(pageNumbers.length)}
        >
          &raquo;
        </span>
      </div>
    </Fragment>
  );
}
