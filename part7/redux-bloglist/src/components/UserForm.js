import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserForm = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserForm;
