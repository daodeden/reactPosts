import { useRef, useState } from "react"
import ClassCounter from "./components/ClassCounter"
import Counter from "./components/Counter"
import PostForm from "./components/PostForm"
import PostItem from "./components/PostItem"
import PostsList from "./components/PostsList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import MySelect from "./components/UI/select/MySelect"
import "./styles/App.css"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript1", body: "Description1" },
    { id: 2, title: "Javascript2", body: "Description2" },
    { id: 3, title: "Javascript3", body: "Description3" },
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const [selectedSort, setSelectedSort] = useState('');

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    console.log(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }}></hr>
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sort by"
          options={[{ value: "title", name: "By name" }, { value: "body", name: "By description" }]}
        />
      </div>
      {posts.length ? (
        <PostsList remove={removePost} posts={posts} title="Список постов 1" />
      ) : (
        <h1 style={{ textAlign: "center" }}>"No posts"</h1>
      )}
    </div>
  )
}

export default App
