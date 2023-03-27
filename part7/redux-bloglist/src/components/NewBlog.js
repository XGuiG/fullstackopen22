import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { notificationToShow } from "../reducers/notificationReducer";

const NewBlog = () => {
  const dispatch = useDispatch();
  const addBlog = async (event) => {
    event.preventDefault();
    const newObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    dispatch(createBlog(newObject));
    dispatch(
      notificationToShow({
        message: `'${newObject.title}' added`,
        type: "success",
      })
    );
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <FormGroup>
          <FormLabel>title:</FormLabel>
          <FormControl name="title"></FormControl>
          <FormLabel>author:</FormLabel>
          <FormControl name="author"></FormControl>
          <FormLabel>url:</FormLabel>
          <FormControl name="url"></FormControl>
          <Button type="submit" variant="primary">
            create
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

// NewBlog.propTypes = {
//   addBlog: PropTypes.func.isRequired
// }

export default NewBlog;
