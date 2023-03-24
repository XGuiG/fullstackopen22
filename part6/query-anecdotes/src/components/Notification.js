import { useContext } from "react";
import NotificationContext from "../Context";

export const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `you voted '${action.anecdote}'`;
    case "ERROR":
      return action.errorMessage;
    case "CREATE":
      return `added '${action.anecdote}'`;
    case "TIMEOUT":
      return null;
    default:
      return state;
  }
};

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (notification !== null) {
    setTimeout(() => {
      dispatch({ type: "TIMEOUT" });
    }, 5000);
  }

  return notification !== null ? <div style={style}>{notification}</div> : null;
};

export default Notification;
