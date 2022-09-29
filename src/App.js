//import { useState } from 'react'
import UserBar from './Components/User/UserBar'
import PostList from './Components/post/PostList';
import CreatePost from './Components/post/CreatePost';

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
      <CreatePost user="ben"/>
    </div>
  );
}

export default App;
