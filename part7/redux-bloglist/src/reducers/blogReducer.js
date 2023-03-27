import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(_, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newObject);
    dispatch(appendBlog(newBlog));
  };
};

export const LikeOf = (blog, blogs) => {
  const blogToChange = { ...blog };
  return async (dispatch) => {
    const ChangedBlog = await blogService.update(blogToChange);
    dispatch(
      setBlogs(
        blogs
          .map((b) => {
            if (b.id === ChangedBlog.id) {
              const blog = { ...b, likes: ChangedBlog.likes };
              return blog;
            }
            return b;
          })
          .sort((a, b) => b.likes - a.likes)
      )
    );
  };
};

export const RemoveOf = (blog, blogs) => {
  return async (dispatch) => {
    const RemovedBlog = await blogService.remove(blog.id);
    dispatch(setBlogs(blogs.filter((b) => b.id !== RemovedBlog.id)));
  };
};

export const createComments = (blog, blogs) => {
  return async (dispatch) => {
    const ChangedBlog = await blogService.addComments({ ...blog });
    dispatch(
      setBlogs(
        blogs
          .map((b) => {
            if (b.id === ChangedBlog.id) {
              const blog = { ...b, comments: ChangedBlog.comments };
              return blog;
            }
            return b;
          })
          .sort((a, b) => b.likes - a.likes)
      )
    );
  };
};

export default blogSlice.reducer;
