import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return notification ? <Alert variant={notification.type}>{notification.message}</Alert> : null
};

export default Notification;
