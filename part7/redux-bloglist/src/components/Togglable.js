import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { notificationToShow } from "../reducers/notificationReducer";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    if (!props.user) {
      dispatch(
        notificationToShow({
          message:
            "you can only create new blog when signed in, click login to sign you account",
          type: "warning",
        })
      );
    } else {
      setVisible(!visible);
    }
  };

  return (
    <div>
      <Button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
};

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
