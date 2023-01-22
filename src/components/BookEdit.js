import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);
  const { updateBookById } = useBooksContext()

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    onSubmit();
    updateBookById(book.id, title);
  };

  return (
    <form onSubmit={handleSubmitForm} className="book-edit">
      <label>Title</label>
      <input className="input" value={title} onChange={handleChange}></input>
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default BookEdit;
