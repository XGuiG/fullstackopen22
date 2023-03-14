import PropTypes from "prop-types";

const NewBlog = ({
  createBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    // blogFormRef.current.toggleVisibility()
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="newTitle"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="write here blog title"
          />
        </div>
        <div>
          author:{" "}
          <input
            id="newAuthor"
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="write here blog author"
          />
        </div>
        <div>
          url:{" "}
          <input
            id="newUrl"
            type="link"
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="write here blog url"
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlog;
