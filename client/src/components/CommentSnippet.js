import React, { useState } from "react";
import Error from "./Error";

//For highlights
import hljs from "highlight.js/lib/core";
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);

const CommentSnippet = ({ id }) => {
  //Storing data about the posts here, date is mentioned but it is actually set by the server not the client
  const [commentData, setCommentData] = useState({
    textContent: "",
  });

  hljs.highlightAll();

  //Send comments to the backend
  const sendComment = (event) => {
    event.preventDefault();
    fetch("/api/user/comments/" + id.id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },

      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location.href = "/user/posts/" + id.id;
        } else {
          //In case we have errors, I have added this error component
          return <Error data={data} />;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //When user is changing the textarea, we must keep updating the preview
  const handleChange = (event) => {
    handleContentChange(event);
    updateCode();
    hljs.highlightAll();
  };

  //Update the commentData when changes happen
  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Update preview
  const updateCode = () => {
    const element = document.getElementById("hg_code");
    element.innerHTML = commentData.textContent;
  };

  return (
    <div style={{ margin: "auto" }}>
      <br></br>
      <textarea
        id="text_content"
        name="textContent"
        value={commentData.textContent}
        onChange={handleChange}
        maxLength="1000"
        placeholder="enter text"
      ></textarea>
      <br></br>
      <button
        onClick={sendComment}
        className="blue lighten-1 waves-effect waves-light btn"
        style={{ marginTop: "20px", marginBottom: "15px" }}
      >
        Send Comment
      </button>
      <h6>Preview Text:</h6>
      <pre>
        <code className="language-javascript" id="hg_code"></code>
      </pre>
      <br></br>
    </div>
  );
};

export default CommentSnippet;
