import React from "react";

const Comment = ({ comm }) => {
  console.log(comm);
  const { body, username, created } = comm;
  console.log("henlo");
  return (
    <div>
      <h5>{username}</h5>
      <p>{body}</p>
      <strong>{created}</strong>
    </div>
  );
};

export default Comment;
