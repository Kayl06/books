import axios from "axios";
import { createContext, useCallback, useState } from "react";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get(`http://localhost:3001/books`);

    setBooks(response.data);
  };

  const stableFetchBooks = useCallback(fetchBooks, []);

  const createBook = async (title) => {
    const response = await axios.post(`http://localhost:3001/books`, {
      title,
    });

    const updatedBooks = [...books, response.data];

    setBooks(updatedBooks);
  };

  const deleteBookById = async (bookID) => {
    await axios.delete(`http://localhost:3001/books/${bookID}`);

    const updatedBooks = books.filter((book) => {
      return bookID !== book.id;
    });

    setBooks(updatedBooks);
  };

  const updateBookById = async (bookID, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${bookID}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (bookID === book.id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    stableFetchBooks,
    createBook,
    updateBookById,
    deleteBookById,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
