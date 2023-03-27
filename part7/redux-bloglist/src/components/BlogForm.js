import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogForm = ({ blogs }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  return (
    <div>
      <h1>blog app</h1>
      <Togglable buttonLabel="create new blog">
        <NewBlog />
      </Togglable>
      <br></br>
      <Table striped>
        <tbody>
        <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogForm;
