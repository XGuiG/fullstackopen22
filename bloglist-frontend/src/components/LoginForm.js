import Notification from "./Notification";
import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  sendMessage,
  errorMessage,
}) => {
  return (
    <div>
      <h2>Login to applicaiton</h2>
      <Notification message={sendMessage} error={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username: <input id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password:{" "}
          <input id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
