import { ReactNode } from "react";

// Interface for a book
export interface Book {
  coverPhotoURL: string | undefined;
  title: string;
  author: ReactNode;
  readingLevel: string;
}

// Interface for the GraphQL query response
export interface BooksQueryResponse {
  books: Book[];
}

// Interface for the query variables
export interface BooksQueryVariables {
  offset: number;
  limit: number;
}