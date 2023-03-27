import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Footer from "./components/Footer";
import { initialBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { initialUsers } from "./reducers/userReducer";
import Menu from "./components/Menu";
import { useMatch } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialBlogs());
  }, []);

  useEffect(() => {
    dispatch(initialUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      // dispatch(SignedUser(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const matchUser = useMatch("/users/:id");
  // console.log(match.params.id)
  const showUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <div className="container">
      <Menu
        showUser={showUser}
        blog={blog}
        user={user}
        blogs={blogs}
        setUser={setUser}
        users={users}
        handleLogout={handleLogout}
      />
      <Footer />
    </div>
  );
};

export default App;
