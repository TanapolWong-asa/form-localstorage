import * as React from "react";
import IBook from "../interfaces/IBook";

export const BooksContext = React.createContext<
  [IBook[], React.Dispatch<React.SetStateAction<IBook[]>>]
>([[], () => null]);

interface BookProviderProp {
  children: React.ReactNode[] | React.ReactNode;
}
export const BookProvider = ({ children }: BookProviderProp) => {
  const [books, setBooks] = React.useState(
    JSON.parse(localStorage.getItem("books") || "[]")
  );

  return (
    <BooksContext.Provider value={[books, setBooks]}>
      {children}
    </BooksContext.Provider>
  );
};
