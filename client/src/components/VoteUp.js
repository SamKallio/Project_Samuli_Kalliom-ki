import React, { useEffect, useState } from "react";

//Like button icon
import { FaThumbsUp } from "react-icons/fa";

//This component is essentially a fully functioning like button
//It handles fetches from the backend and updating of the likes count we see in the browser

const VoteUp = ({ id }) => {
  //store votes for display
  const [votes, setVotes] = useState(0);

  //Getting votes from the backend using post/comment id
  useEffect(() => {
    fetch("/api/votes/" + id.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVotes(data);
      }) //This function will generate the posts
      .catch((error) => console.error(error));
  }, []);

  //This post requires authenication, so we also try to send the token. Otherwise non-authenicated users could like also.
  const voteNow = (event) => {
    event.preventDefault();

    fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify({ id: event.target.value }), //button value has the post/comment id
    })
      .then((response) => response.json())
      .then((data) => {
        setVotes(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "5%",
        margin: "auto",
        paddingLeft: "15%",
      }}
    >
      <button
        value={id.id}
        className="green lighten-1 waves-effect waves-light btn"
        onClick={voteNow} //onClick for vote
        style={{
          width: "20px",
          height: "40px",
          display: "flex",
          marginLeft: "78%",
          lineHeight: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            pointerEvents: "none",
            margin: "auto",
            fontSize: "70%",
            flexWrap: "wrap-reverse",
          }}
        >
          <p style={{}}>{votes.votes}</p>
          {/*This is a thumbs up icon, very cool.*/}
          <FaThumbsUp />
        </div>
      </button>
    </div>
  );
};

export default VoteUp;
