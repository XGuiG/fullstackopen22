import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

export const notificationToShow = (message) => {
  return (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(showNotification(null));
    }, 5000);
  };
};

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  
  if (!notification) {
    return null
  } else if (notification === 'Wrong username or password!'){
    return <Alert variant="danger">{notification}</Alert>
  } else {
    return <Alert variant="success">{notification}</Alert>
  }
};

export default Notification;
