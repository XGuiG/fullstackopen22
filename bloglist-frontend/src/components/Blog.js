import { useState } from "react";
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [viewBlog, setViewBlog] = useState(false);

  const handleViewBlog = () => {
    if (viewBlog) {
      if (blog.user) {
        return (
          <div id="user">
            Url: {blog.url}
            <br></br>
            Likes: {blog.likes}{" "}
            <button className="like" onClick={() => updateLike(blog)}>like</button> <br></br>
            Username: {blog.user.username}
            <br></br>
            {user.username === blog.user.username ? (
              <button className="remove" onClick={() => removeBlog(blog)}>remove</button>
            ) : (
              ""
            )}
          </div>
        );
      } else {
        return (
          <div id="nouser">
            Url: {blog.url}
            <br></br>
            Likes: {blog.likes}{" "}
            <button onClick={() => updateLike(blog)}>like</button> <br></br>
          </div>
        );
      }
    }
  };
  return (
    <div className="BlogDefault" style={blogStyle}>
      {blog.title}: {blog.author}
      <button className="click" onClick={() => setViewBlog(!viewBlog)}>
        {viewBlog ? "hide" : "view"}
      </button>
      {viewBlog ? handleViewBlog() : ""}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog;
