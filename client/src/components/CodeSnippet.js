import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

//For highlights
import hljs from "highlight.js/lib/core";
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);
//This component is used when user wants to post a code snippet

const CodeSnippet = () => {
  const navigate = useNavigate(); //Used to send user to other URL

  hljs.highlightAll();

  //Storing data about the posts here, date is mentioned but it is actually set by the server not the client
  const [postData, setPostData] = useState({
    title: "",
    textContent: "",
  });

  //Send a new post to the backend
  const sendPost = (event) => {
    event.preventDefault();
    fetch("/api/user/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },

      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          navigate("/user/posts");
        } else {
          //In case we have errors, I have added this error component
          return <Error data={data} />;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //When user is changing the textarea, we must update it to keep the styling
  const handleChange = (event) => {
    handleContentChange(event);
    updateCode();
    hljs.highlightAll();
  };

  //Update the postData when changes occur
  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Update preview highlights
  const updateCode = () => {
    document.getElementById("hg_code").innerHTML = postData.textContent;
  };

  return (
    <div style={{ margin: "auto" }}>
      <h5 style={{ marginBottom: "0px", padding: "0px" }}>Title</h5>
      <input
        style={{ width: "40%" }}
        name="title"
        id="title"
        onChange={handleContentChange}
        value={postData.title}
        type="text"
      ></input>
      <br></br>
      <textarea
        id="text_content"
        name="textContent"
        value={postData.textContent}
        onChange={handleChange}
        maxLength="1000"
        placeholder="enter text"
      ></textarea>
      <br></br>
      <button
        onClick={sendPost}
        className="blue lighten-1 waves-effect waves-light btn"
        style={{ marginTop: "20px", marginBottom: "15px" }}
      >
        Post a Code
      </button>
      <h6>Preview Text:</h6>
      <pre>
        <code id="hg_code" className="language-javascript"></code>
      </pre>
      <br></br>
    </div>
  );
};

export default CodeSnippet;
