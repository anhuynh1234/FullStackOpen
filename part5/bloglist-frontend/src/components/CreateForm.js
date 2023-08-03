const CreateForm = ({title, author, url, setTitle, setAuthor, setUrl, handleCreate}) => {

    return (
        <form onSubmit={handleCreate}>
                <div>
                    Title:
                        <input type='text' value={title} name='Title' onChange={setTitle} />
                </div>
                <div>
                    Author:
                        <input type='text' value={author} name='Author' onChange={setAuthor} />
                </div>
                <div>
                    Url:
                        <input type='text' value={url} name='Url' onChange={setUrl} />
                </div>
                <button type='submit'>Create</button>
        </form>
    )
}

export default CreateForm