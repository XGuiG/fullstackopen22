import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createComments, LikeOf, RemoveOf } from "../reducers/blogReducer";
import { notificationToShow } from "./Notification";

const Blog = ({ blog, user, blogs }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  if (!blog) {
    return null;
  }

  const updateLike = (blog) => {
    console.log("like", blog.id);
    dispatch(LikeOf(blog, blogs));
    dispatch(notificationToShow(`you liked '${blog.title}'`));
  };

  const removeBlog = (blog) => {
    const ok = window.confirm(
      `Remove blog '${blog.title}' by '${blog.author}'?`
    );
    if (ok) {
      dispatch(RemoveOf(blog, blogs));
      navigate('/')
      dispatch(
        notificationToShow(
          `Removed blog '${blog.title}' by '${blog.author}'`
        )
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
      notificationToShow(`added comment '${comment}' to '${blog.title}'`)
    );
  };

  return (
    <div>
      <h1>blog app</h1>     
      <h3>{blog.title}</h3>
      <a href={`${blog.url}`}>{blog.url}</a>
      <br></br>
      {blog.likes} likes
      <button onClick={() => updateLike(blog)}>like</button> <br></br>
      added by {blog.user.username}
      <br></br>
      {user.username === blog.user.username ? (
        <button onClick={() => removeBlog(blog)}>remove</button>
      ) : (
        ""
      )}
      <h3>comments</h3>
      <form onSubmit={addComments}>
        <input name="comment" />
        <button type="submit">
          add comment
        </button>
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
