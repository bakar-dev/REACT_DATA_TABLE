import React from "react";
import { Button } from "reactstrap";

const buttons = [{ value: 10 }, { value: 15 }, { value: 20 }];

const PageLimit = ({ changePageLimit, pageLimit }) => {
  return (
    <div>
      {buttons.map(({ value }) => (
        <Button
          key={value}
          id={value}
          className={`btn-sm ${pageLimit === value ? "active" : ""}`}
          color="light"
          onClick={() => changePageLimit(value)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};

export default PageLimit;
