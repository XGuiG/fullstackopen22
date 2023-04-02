import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { LOGIN } from "../queries";

const Login = (props) => {
  const username = useField("text");
  const password = useField("password");
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token); 
      navigate('/')
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: {
        username: username.input.value,
        password: password.input.value,
      },
    });
    
    username.reset();
    password.reset();
  };

  return (
    <div>
      <h2>Log in to library app</h2>
      <form onSubmit={submit}>
        <div>
          username: <input {...username.input} />
        </div>
        <div>
          password: <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
