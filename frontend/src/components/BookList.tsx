import { useQuery, gql } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "./ui/Card";

const BOOKS_QUERY = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const BookList = ({
  search,
  addBook,
}: {
  search: string;
  addBook: (book: { author: ReactNode; title: string }) => void;
}) => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  const [books, setBooks] = useState<
    {
      coverPhotoURL: string | undefined;
      author: ReactNode;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    if (data) {
      setBooks(
        data.books.filter((book: { title: string }) =>
          book.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, search]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(books.map((book) => book.coverPhotoURL));
  console.log(books.map((book) => typeof(book.coverPhotoURL)));

  return (
      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid key={index} item xs={12} sm={8} md={6} lg={3}>
            <Card
              coverPhotoURL={book.coverPhotoURL}
              title={book.title}
              author={book.author}
              addBook={() => addBook(book)}
            />
          </Grid>
        ))}
      </Grid>
  );
};

export default BookList;
