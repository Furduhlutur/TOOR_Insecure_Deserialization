import React from "react";

const Comment = ({ comm }) => {
  const { body, username, created } = comm;
  return (
    <div>
      <h5>{username}</h5>
      <p>{body}</p>
      <strong>{created}</strong>
    </div>
  );
};

export default Comment;
