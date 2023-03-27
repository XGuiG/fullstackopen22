import { Nav, Navbar, Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import LoginForm from "./LoginForm";
import Notification from "./Notification";
import User from "./User";
import UserForm from "./UserForm";

const Menu = ({
  showUser,
  user,
  blog,
  blogs,
  setUser,
  users,
  handleLogout,
}) => {
  const padding = {
    paddingRight: 5,
  };
  if (!user) {
    return <LoginForm setUser={setUser} />;
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="#">user '{user.name}' logged in </Navbar.Brand>
        <Button onClick={handleLogout} variant="secondary">
          logout
        </Button>
      </Navbar>
      <Notification />
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/" element={<BlogForm blogs={blogs} />} />
        <Route path="/users" element={<UserForm users={users} />} />
        <Route path="/users/:id" element={<User user={showUser} />} />
        <Route
          path="/blogs/:id"
          element={<Blog blog={blog} user={user} blogs={blogs} />}
        />
      </Routes>
    </div>
  );
};

export default Menu;