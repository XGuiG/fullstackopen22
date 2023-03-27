import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createComments, LikeOf, RemoveOf } from "../reducers/blogReducer";
import { notificationToShow } from "../reducers/notificationReducer";

const Blog = ({ blog, user, blogs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!blog) {
    return null;
  }

  const updateLike = (blog) => {
    console.log("like", blog.id);
    dispatch(LikeOf(blog, blogs));
    dispatch(
      notificationToShow({
        message: `you liked '${blog.title}'`,
        type: "success",
      })
    );
  };

  const removeBlog = (blog) => {
    const ok = window.confirm(
      `Remove blog '${blog.title}' by '${blog.author}'?`
    );
    if (ok) {
      dispatch(RemoveOf(blog, blogs));
      navigate("/");
      dispatch(
        notificationToShow({
          message: `Removed blog '${blog.title}' by '${blog.author}'`,
          type: "success",
        })
      );
    }
  };

  const addComments = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    const newObject = {
      ...blog,
      comments: comment,
    };
    event.target.comment.value = "";
    dispatch(createComments(newObject, blogs));
    dispatch(
      notificationToShow({
        message: `added comment '${comment}' to '${blog.title}'`,
        type: "success",
      })
    );
  };

  return (
    <div>
      <h1>blog app</h1>
      <br></br>
      <h3>
        <strong>{blog.title}</strong>
      </h3>
      <p>
        <a href={`${blog.url}`}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes
        <button onClick={() => updateLike(blog)}>like</button>
      </p>
      <p>added by {blog.user.username}</p>
      <p>
        {user && user.username === blog.user.username ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : (
          <button disabled="disabled">remove</button>
        )}
      </p>
      <h3>
        <strong>comments</strong>
      </h3>
      <form onSubmit={addComments}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <div>
        <br></br>
        {blog.comments
          ? blog.comments.map((comment) => <li key={comment}>{comment}</li>)
          : null}
      </div>
    </div>
  );
};

export default Blog;
