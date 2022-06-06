import { useRef, useState, useMemo } from "react"
import ClassCounter from "./components/ClassCounter"
import Counter from "./components/Counter"
import PostFilter from "./components/PostFilter"
import PostForm from "./components/PostForm"
import PostItem from "./components/PostItem"
import PostsList from "./components/PostsList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import MySelect from "./components/UI/select/MySelect"
import "./styles/App.css"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Java", body: "Web-browsers" },
    { id: 2, title: "Python", body: "Backend" },
    { id: 3, title: "C++", body: "Computer Vision" },
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    console.log("get sorted")
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {sortedAndSearchedPosts.length ? (
        <PostsList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Список постов 1"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>"No posts"</h1>
      )}
    </div>
  )
}

export default App
