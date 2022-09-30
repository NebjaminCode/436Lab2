import { v4 as uuidv4 } from "uuid";
import { useState, useReducer } from "react";
import UserBar from "./Components/User/UserBar";
import PostTodo from "./Components/post/PostTodo";
import CreateTodo from "./Components/post/CreateTodo";
import appReducer from "./Reducers";

function App() {
  const defaultPosts = [
    {
      title: "first post",
      content: "first content",
      author: "Ben",
      id: uuidv4(),
    },
    {
      title: "second post",
      content: "second content",
      author: "Ben",
      id: uuidv4(),
    },
  ];

  // const [user, dispatchUser] = useReducer(userReducer, "");
  // const [posts, dispatchPosts] = useReducer(postReducer, defaultPosts);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: defaultPosts,
  });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <PostTodo posts={state.posts} />
      {state.user && (
        <CreateTodo user={state.user} posts={state.posts} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
