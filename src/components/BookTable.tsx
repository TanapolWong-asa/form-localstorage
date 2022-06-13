import * as React from "react";
import IBook from "../interfaces/IBook";
import { BooksContext } from "../store/BooksContext";

interface BookTableProps {}

// Show book list using HTML table
const BookTable: React.FunctionComponent<BookTableProps> = () => {
  const [books] = React.useContext(BooksContext);

  // 'Save' books list to localStorage whenever the list change
  React.useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    console.log("save books localstorage");
  }, [books]);

  return (
    <table>
      <thead>
        <tr>
          <th>Book Id</th>
          <th>Book Name</th>
          <th>Book Price</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book: IBook) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>{book.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
