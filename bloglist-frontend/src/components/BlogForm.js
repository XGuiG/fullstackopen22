import Notification from "./Notification";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
// import { useRef } from "react";

const BlogForm = ({
  blogs,
  user,
  sendMessage,
  errorMessage,
  handleLogout,
  createBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  blogFormRef,
  updateLike,
  removeBlog,
}) => {
  const sortByLikes = blogs.sort((a, b) => b.likes - a.likes);
  // const blogFormRef = useRef()
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={sendMessage} error={errorMessage} />
      <p>
        user '{user.name}' logged in{" "}
        <button onClick={handleLogout}>logout</button>{" "}
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog
          createBlog={createBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <br></br>
      {sortByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLike={updateLike}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default BlogForm;
