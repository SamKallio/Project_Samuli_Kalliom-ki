import React from "react";

/*This is my footer component, it exists on all pages of this website. Uses Materialize.css */
const Footer = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <footer
        className="page-footer blue lighten-1 z-depth-1"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <div className="container">
          <h6 className="col 6" style={{ marginTop: "0px" }}>
            Project by
          </h6>
          <p className="col 6"> © Samuli Kalliomäki</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
