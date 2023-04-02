import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Authors from "./Authors";
import Books from "./Books";
import Login from "./Login";
import NewBook from "./NewBook";
import Recommend from "./Recommend";

const Menu = ({ data, setToken, token, logout }) => {
  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          authors
        </Link>
        <Link style={padding} to="/books">
          books
        </Link>
        {token ? (
          <div>
            <Link style={padding} to="/books/addbook">
              add book
            </Link>
            <Link style={padding} to='/recommend'>recommend</Link>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books books={data.allBooks} />} />
        <Route path="/books/addbook" element={<NewBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/recommend" element={<Recommend books={data.allBooks}/>} />
      </Routes>
    </Router>
  );
};

export default Menu;
