import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//This component handles the create post "navigation"
//create post button display: will be "none" if token is not found

const CreatePost = () => {
  const navigate = useNavigate();

  //Check if token exists, depending on that we will either show the create a new post button or hide it
  const [isToken, setToken] = useState(!!localStorage.getItem("auth_token"));

  //Update token state if there is changes to the token
  useEffect(() => {
    setToken(!!localStorage.getItem("auth_token"));
  }, []);

  //Upon clicking the post create a new post button, we will redirect the user to the correct place where posts are done
  const handleClick = (event) => {
    event.preventDefault();
    if (localStorage.getItem("auth_token")) {
      //check browser localstorage for token
      navigate("/user/posts/newpost");
    } else {
      console.log("User must login first!");
      navigate("/");
    }
  };
  return (
    <div>
      <button
        id="createPost"
        onClick={handleClick}
        className="blue lighten-1 waves-effect waves-light btn"
        style={{
          marginTop: "50px",
          marginBottom: "25px",
          display: isToken ? "inline-block" : "none",
        }}
        /* ^this create post button is only visible if token is found */
      >
        Create a New Post
      </button>
      <div
        className="blue lighten-1"
        style={{ width: "80%", height: "2px", margin: "auto" }}
      ></div>
    </div>
  );
};

export default CreatePost;
