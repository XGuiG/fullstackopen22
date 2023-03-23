import { useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};

export const notificationToShow = (message, time) => {
  return (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(showNotification(null));
    }, time*1000);
  };
};

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return notification !== null ? <div style={style}>{notification}</div> : null;
};

export default Notification;
