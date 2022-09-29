//import { useState } from 'react'
import UserBar from './Components/User/UserBar'
import PostList from './Components/post/PostList';

function App() {

  const testPost = [
    {
      title: "fist post",
      content: "first content",
      author: "Ben"
    },
    {
      title: "second post",
      content: "second content",
      author: "Ben"
    }
  ]

  return (
    <div>
      <UserBar />
      <PostList posts={testPost} />
    </div>
  );
}

export default App;
