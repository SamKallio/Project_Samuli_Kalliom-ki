import React, { useEffect } from "react";
import { FaFistRaised } from "react-icons/fa"; //Using React Icon just to test them :)

//This is the frontpage component, mostly just informative and has some stylings and links

const Front = () => {
  //This adds a sample post into the posts category...
  useEffect(() => {
    fetch("/api/sample", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      }) //This function will generate the posts
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <br></br>
      <h5>
        Welcome to my Project Site <FaFistRaised style={{ fontSize: "30px" }} />
      </h5>
      <br></br>
      <h6>Site Instructions </h6>
      <div
        className="blue lighten-1"
        style={{ width: "25%", height: "1px", margin: "auto" }}
      ></div>
      <ul>
        <li>
          First you must register at <a href="/user/register">Register Page</a>
        </li>
        <li>
          Then you can login at <a href="/user/login">Login page</a>
        </li>
        <li>
          Once you are logged in, you can start posting threads, liking or
          commenting someone's thread at <a href="/user/posts">Posts page</a>
        </li>
        <li>Logout is located in the Navbar</li>
        <li>Have fun!</li>
      </ul>
      <div
        className="blue lighten-1"
        style={{ width: "25%", height: "1px", margin: "auto" }}
      ></div>
    </div>
  );
};

export default Front;
