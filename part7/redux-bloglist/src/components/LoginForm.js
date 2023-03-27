import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { notificationToShow } from "../reducers/notificationReducer";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      event.target.username.value = "";
      event.target.password.value = "";
      dispatch(
        notificationToShow({
          message: `'${user.name}' logged in successfully`,
          type: "success",
        })
      );
      navigate("/");
    } catch (exception) {
      dispatch(
        notificationToShow({
          message: "Wrong username or password!",
          type: "danger",
        })
      );
    }
  };
  return (
    <div>
      <h1>Login to applicaiton</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control name="username"></Form.Control>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name="password"></Form.Control>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
