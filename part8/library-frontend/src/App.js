import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      // console.log(data)
      const addedBook = data.data.bookAdded;
      window.alert(`'${addedBook.title}' added!`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Menu
        data={result.data}
        token={token}
        setToken={setToken}
        logout={logout}
      />
    </div>
  );
};

export default App;
