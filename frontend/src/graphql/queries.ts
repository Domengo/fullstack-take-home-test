import { gql, TypedDocumentNode } from "@apollo/client";
import { Book, BooksQueryVariables } from "../graphql/types";

export const BOOKS_QUERY: TypedDocumentNode<Book, BooksQueryVariables>  = gql`
  query Books($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;
