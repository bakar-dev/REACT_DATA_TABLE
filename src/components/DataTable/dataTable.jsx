import React, { Fragment, useState } from "react";
import { Table, Button } from "reactstrap";

export default function DataTable({
  data,
  loading,
  deleteItem,
  updateItem,
  sort,
  sortBy
}) {
  const [contentValues, setContentValues] = useState(null);

  //handle editable
  const setEditAble = (e, value) => {
    e.target.contentEditable = value;
  };

  //change content of td by making editable
  const setContent = e => {
    setEditAble(e, true);
    setContentValues(e.target.innerText);
  };

  //update item on enter key press
  const onEnterKeyPress = (e, field) => {
    if (e.key === "Enter") {
      if (e.target.innerText === "") {
        e.target.innerText = contentValues;
      }
      setEditAble(e, false);
      updateItem(e.target, field);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th onClick={() => sort("id")}>#</th>
            <th onClick={() => sort("title")}>
              <i className="fa fa-sort" /> Title
            </th>
            <th onClick={() => sort("body")}>
              <i className="fa fa-sort" /> Body{" "}
            </th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, title, body }) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td
                id={id}
                suppressContentEditableWarning={true}
                onClick={e => setContent(e)}
                onKeyPress={e => onEnterKeyPress(e, "title")}
                onMouseLeave={e => setEditAble(e, false)}
              >
                {title}
              </td>
              <td
                id={id}
                suppressContentEditableWarning={true}
                onClick={e => setContent(e)}
                onKeyPress={e => onEnterKeyPress(e, "body")}
                onMouseLeave={e => setEditAble(e, false)}
              >
                {body}
              </td>
              <td>
                <Button
                  id={id}
                  className="btn-sm btn-danger pr-2 pl-2"
                  onClick={deleteItem}
                >
                  x
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}
