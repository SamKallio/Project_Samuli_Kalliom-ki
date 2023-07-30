import React from "react";
import CreatePost from "./CreatePost";
import ShowPosts from "./ShowPosts";

//This component adds the create a post button and also shows previously posted posts below it

const Posts = () => {
  return (
    <div>
      <CreatePost />
      <h4>Posts:</h4>
      <ShowPosts />
    </div>
  );
};

export default Posts;
