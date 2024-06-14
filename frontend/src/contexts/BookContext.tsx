/* eslint-disable react-refresh/only-export-components */
// src/contexts/BookContext.tsx

import { createContext, useContext, ReactNode } from "react";
import { Book } from "../graphql/types";

type BookContextType = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (book: Book) => void;
  readingList: Book[];
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children, books, addBook, removeBook, readingList }: BookContextType & { children: ReactNode }) => (
  <BookContext.Provider value={{ books, addBook, removeBook, readingList }}>
    {children}
  </BookContext.Provider>
);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};