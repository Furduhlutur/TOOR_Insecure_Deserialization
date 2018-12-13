import React from "react";

// MaterialUI
import { Card, CardContent, Typography } from "@material-ui/core";

// CSS
import styles from "./Comment.module.css";

const Comment = ({ comm }) => {
  const { body, username, created } = comm;
  return (
    <div className={styles["get-away"]}>
      <Card>
        <CardContent>
          <Typography component="p">
            <span className={styles["username"]}>{username}</span> <br /> {body}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {created}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
