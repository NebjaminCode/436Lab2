import { useState } from "react";
import UserBar from "./Components/User/UserBar";
import PostList from "./Components/post/PostList";
import CreatePost from "./Components/post/CreatePost";

function App() {
  const initialPosts = [
    {
      title: "first post",
      content: "first content",
      author: "Ben",
    },
    {
      title: "second post",
      content: "second content",
      author: "Ben",
    },
  ];

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      <PostList posts={posts} />
      {user && <CreatePost user={user} posts={posts} setPosts={setPosts} />}
    </div>
  );
}

export default App;
