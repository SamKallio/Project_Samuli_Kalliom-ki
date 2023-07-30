import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoteUp from "./VoteUp";

//This component fetches all the posts from backend and shows them

const ShowPosts = () => {
  const navigate = useNavigate();

  //Will store posts here
  const [posts, setPosts] = useState([]);

  const showContent = (event) => {
    navigate("/user/posts/" + event.target.value);
  };

  //Fetch the posts from the backend
  useEffect(() => {
    fetch("/api/user/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      }) //This function will generate the posts
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <ul>
        {/*This posts.map allows creation of multiple posts in same format. Super handy!*/}
        {posts.map((post) => (
          <li
            style={{ marginTop: "15px", marginBottom: "15px" }}
            key={post._id}
          >
            <span id="post-Style">
              <button
                style={{ maxWidth: "300px" }}
                onClick={showContent}
                value={post._id}
                className="green lighten-1 waves-effect waves-light btn"
              >
                Title: {post.title}
              </button>
              <div
                style={{
                  marginLeft: "-1%",
                  display: "inline-block",
                }}
              >
                <VoteUp id={{ id: post._id }} />
              </div>
            </span>
            <br></br>
            <span style={{ color: "green" }}>by {post.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPosts;
