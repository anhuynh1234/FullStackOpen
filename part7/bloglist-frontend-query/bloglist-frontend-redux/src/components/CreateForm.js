import PropTypes from "prop-types";

const CreateForm = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleCreate,
}) => {
  return (
    <form onSubmit={handleCreate}>
      <div>
        Title:
        <input
          className="title"
          type="text"
          value={title}
          name="Title"
          onChange={setTitle}
        />
      </div>
      <div>
        Author:
        <input
          className="author"
          type="text"
          value={author}
          name="Author"
          onChange={setAuthor}
        />
      </div>
      <div>
        Url:
        <input
          className="url"
          type="text"
          value={url}
          name="Url"
          onChange={setUrl}
        />
      </div>
      <button className="create" type="submit">
        Create
      </button>
    </form>
  );
};

CreateForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default CreateForm;
