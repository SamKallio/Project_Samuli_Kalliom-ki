import React, { useEffect, useState } from "react";
import CommentSnippet from "./CommentSnippet"; //Comment section component
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VoteUp from "./VoteUp"; //VoteUp Button component

//This is the post component. It handles what you see when you open a post
//Also allows you to post comments by incorporating commentsnippet component which handles commenting
//The VoteUp component is also incorporated here

//For highlights
import hljs from "highlight.js/lib/core";
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);

const Post = () => {
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState([]);

  const { id } = useParams(); //This ID is essentially at the end of URL which we can see when we open a post
  const navigate = useNavigate();

  hljs.highlightAll();

  //FETCH POSTS
  useEffect(() => {
    fetch("/api/user/posts/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
      })
      .catch((error) => console.error(error));

    //FETCH COMMENTS
    fetch("/api/user/comments/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //If we want to return back to viewing posts
  const backtoPosts = () => {
    navigate("/user/posts");
  };

  return (
    <div>
      <div className="post-container">
        <h5>{postData.title}</h5>
        <span
          style={{
            color: "green",
            textAlign: "left",
            marginBottom: "-5%",
            padding: "10px",
            fontSize: "80%",
          }}
        >
          Posted by {postData.username}
        </span>
        <br></br>
        <pre>
          <code className="cmt-Post hljs language-javascript">
            {postData.textContent}
          </code>
        </pre>
        <p>{postData.date}</p>
      </div>
      <ul>
        {/*This lists all the comments to li elements */}
        {comments.map((comment) => (
          <li
            style={{ marginTop: "20px", marginBottom: "20px" }}
            key={comment._id}
          >
            <div className="comment-container">
              <pre>
                <p
                  style={{
                    color: "green",
                    textAlign: "center",
                  }}
                >
                  Comment by {comment.username}
                </p>
                <code className="cmt-Code hljs language-javascript">
                  {comment.textContent}
                </code>
              </pre>
              <br></br>
              {/*VoteUp is essentially voting component (a button that lets you thumbs up a post you like and then communicates with the backend) */}
              <VoteUp id={{ id: comment._id }} />
              <p style={{ paddingBottom: "10px" }}>{comment.date}</p>
            </div>
          </li>
        ))}
      </ul>
      {/*CommentSnippet is a component which is used to post Comments. It will add comment box and its functionality to here */}
      <CommentSnippet id={{ id: id }} />
      <button
        className="blue lighten-1 waves-effect waves-light btn commentBtns"
        onClick={backtoPosts}
      >
        Return to posts
      </button>
    </div>
  );
};

export default Post;
