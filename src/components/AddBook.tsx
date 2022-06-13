import * as React from "react";
import IDraft from "../interfaces/IDraft";
import { BooksContext } from "../store/BooksContext";
interface AddBookProps {}

const AddBook: React.FunctionComponent<AddBookProps> = () => {
  // Declare field for data (there's probably a better way using object)
  const [name, setName] = React.useState<IDraft>({
    value: "",
    isLoadedFromDraft: false,
  });
  const [price, setPrice] = React.useState<IDraft>({
    value: "",
    isLoadedFromDraft: false,
  });
  const [author, setAuthor] = React.useState<IDraft>({
    value: "",
    isLoadedFromDraft: false,
  });
  // Books list from context
  const [books, setBooks] = React.useContext(BooksContext);

  // Read draft from localStorage
  React.useEffect(() => {
    const bookDraft = localStorage.getItem("bookDraft") || "{}";
    const { name, author, price } = JSON.parse(bookDraft);
    if (name) {
      setName({ value: name, isLoadedFromDraft: true });
    }
    if (author) {
      setAuthor({ value: author, isLoadedFromDraft: true });
    }
    if (price) {
      setPrice({ value: price, isLoadedFromDraft: true });
    }
  }, []);

  // save 'dirty' field to bookDraft in localStorage
  const draftSave = (fieldName: string, value: string) => {
    const bookDraft = localStorage.getItem("bookDraft") || "{}";
    const bookObj = JSON.parse(bookDraft);

    localStorage.setItem(
      "bookDraft",
      JSON.stringify({
        ...bookObj,
        [fieldName]: value,
      })
    );
    console.log(`field ${fieldName} saved`);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (name.value === "" || price.value === "" || author.value === "") {
      alert("All fields are required");
      return;
    }
    if (parseFloat(price.value) <= 0) {
      alert("Price must > 0");
      return;
    }

    setBooks([
      ...books,
      {
        name: name.value,
        price: parseFloat(price.value),
        author: author.value,
        id: books.length + 1,
      },
    ]);
    localStorage.removeItem("bookDraft");
    setName({ value: "", isLoadedFromDraft: false });
    setPrice({ value: "", isLoadedFromDraft: false });
    setAuthor({ value: "", isLoadedFromDraft: false });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        value={name.value}
        onChange={(e) => {
          setName({ value: e.target.value, isLoadedFromDraft: false });
          draftSave("name", e.target.value);
        }}
        style={{
          color: name.isLoadedFromDraft ? "red" : "black", // red text = loaded from draft
        }}
      />
      <br />
      <label htmlFor="price">Price: </label>
      <input
        type="number"
        name="price"
        value={price.value}
        onChange={(e) => {
          setPrice({ value: e.target.value, isLoadedFromDraft: false });
          draftSave("price", e.target.value);
        }}
        style={{
          color: price.isLoadedFromDraft ? "red" : "black",
        }}
      />
      <br />
      <label htmlFor="author">Author: </label>
      <input
        type="text"
        name="author"
        value={author.value}
        onChange={(e) => {
          setAuthor({ value: e.target.value, isLoadedFromDraft: false });
          draftSave("author", e.target.value);
        }}
        style={{
          color: author.isLoadedFromDraft ? "red" : "black",
        }}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default AddBook;
