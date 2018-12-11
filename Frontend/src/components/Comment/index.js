import React from "react";

const Comment = ({ comm }) => {
  const { body, username, created } = comm;
  console.log(body);
  return (
    <div>
      <h5>{username}</h5>
      <p>{body}</p>
      <strong>{created}</strong>
    </div>
  );
};

export default Comment;
