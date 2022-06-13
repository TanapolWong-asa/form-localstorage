import "./App.css";
import BookTable from "./components/BookTable";
import AddBook from "./components/AddBook";
import { BookProvider } from "./store/BooksContext";

function App() {
  // App has 2 main components:
  // 1. BookTable to show book list
  // 2. AddBook form
  return (
    <BookProvider>
      <div>
        <BookTable />
        <AddBook />
      </div>
    </BookProvider>
  );
}

export default App;
