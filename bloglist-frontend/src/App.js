import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [sendMessage, setSendMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword("");
      setSendMessage(`${user.name} logged in successfully`);
      setTimeout(() => {
        setSendMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        blogFormRef.current.toggleVisibility()
      })
      .then(() => {
        setSendMessage(`a new blog '${newTitle}' by '${newAuthor}' added`);
        setTimeout(() => {
          setSendMessage(null);
        }, 5000);
      });
  };

  const updateLike = (blog) => {
    blogService.update(blog.id, { ...blog }).then((updatedBlog) => {
      setBlogs(
        blogs.map((b) => {
          if (b.id === blog.id) {
            b.likes = updatedBlog.likes;
          }
          return b;
        })
      );
    });
  };

  const removeBlog = (blog) => {
    const ok = window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`);
    if (ok) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
        })
        .then(() => {
          setSendMessage(`Removed blog '${blog.title}' by '${blog.author}'`);
          setTimeout(() => {
            setSendMessage(null);
          }, 5000);
        })
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
          sendMessage={sendMessage}
          errorMessage={errorMessage}
        />
      ) : (
        <BlogForm
          blogs={blogs}
          user={user}
          sendMessage={sendMessage}
          errorMessage={errorMessage}
          handleLogout={handleLogout}
          createBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          blogFormRef={blogFormRef}
          updateLike={updateLike}
          removeBlog={removeBlog}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
