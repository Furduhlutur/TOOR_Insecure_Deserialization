import { GET_POSTS, ERROR_POSTS, DEBUG } from "../constants";

const getPostsSuccess = posts => {
  return {
    type: GET_POSTS,
    payload: posts
  };
};

const getPostsError = err => {
  return {
    type: ERROR_POSTS,
    payload: err
  };
};

export const getPosts = () => {
  return dispatch => {
    return fetch(DEBUG ? "http://localhost:5000/api/post" : "/api/post", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        let posts = resp.map(post => {
          if (post.title === "The origins of the pickle") {
            return {
              image:
                "https://migardener-myworksdesign.netdna-ssl.com/wp-content/uploads/2016/11/national-pickling-cucumber.jpg",
              ...post
            };
          }
          return {
            image:
              "https://assets3.thrillist.com/v1/image/962161/size/tl-horizontal_main/why-i-hate-a-food-you-probably-love-pickles",
            ...post
          };
        });
        dispatch(getPostsSuccess(posts));
      })
      .catch(error => dispatch(getPostsError(error)));
  };
};
