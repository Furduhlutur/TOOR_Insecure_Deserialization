DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS comment;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id)
);

CREATE TABLE comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post (id)
    FOREIGN KEY (author_id) REFERENCES user (id)
);

INSERT INTO user (username, password) VALUES ("AliceBob", "god");

INSERT INTO post (author_id, title, body) VALUES
(
    1,
    "The origins of the pickle",
    "About a month ago I bought the book 'The complete history of the pickle' and I just finished it yesterday.Wow, just wow. This has to be the greatest book out there in the pickle category. It is absolutely packed with information about the wonderful pickle, if there is anything you would like to know about the pickle it is in this book. From the great controversy of whether the pickle was made for the workers that built the Great Wall of China or whether they were first made in Mesopotamia (the fanatics) to the fact that most english speaking countries call the pickle a gherkin (the weirdos). I can not recommend this book enough. If you have a spare 1000 bucks lying around I suggest you go to your nearest bookshop and buy it. As always have a pickle day."
);

INSERT INTO post (author_id, title, body) VALUES
(
    1,
    "Why must people hate the god like delicacy that the pickle is",
    "I can not understand how people can be so mean to the wonderful pickles. To go as far as to call them evil is to me insane. What have pickles ever done to you!? All they ever did was try to make your boring meal more exciting and succulent. Sorry about the rant but this has been driving me nuts the past couple of weeks. As always have a pickle day, unless you are a person that calls pickles evil 😠"
);

