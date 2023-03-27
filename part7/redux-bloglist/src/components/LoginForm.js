import Notification from "./Notification";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { notificationToShow } from "./Notification";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();
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
      dispatch(notificationToShow(`'${user.name}' logged in successfully`));
    } catch (exception) {
      dispatch(notificationToShow("Wrong username or password!"));
    }
  };
  return (
    <div>
      <h1>Login to applicaiton</h1>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control name='username'></Form.Control>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name='password'></Form.Control>
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
