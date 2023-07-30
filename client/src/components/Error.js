import React from "react";

/*Prints error message provided by props in h1 element */
const Error = (props) => {
  return (
    <nav>
      <div>
        <h1>{props.data}</h1>
      </div>
    </nav>
  );
};

export default Error;
