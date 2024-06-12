import { useQuery, gql } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Cardy from "./ui/Cardy";

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
  removeBook,
  readingList,
}: {
  search: string;
  addBook: (book: { author: ReactNode; title: string }) => void;
  removeBook: (book: { author: ReactNode; title: string }) => void;
  readingList: Array<{ author: ReactNode; title: string }>;
}) => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  const [books, setBooks] = useState<
    {
      isFavorite: boolean;
      coverPhotoURL: string | undefined;
      author: ReactNode;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    if (data) {
      const filteredBooks = data.books
        .filter((book: { title: string }) =>
          book.title.toLowerCase().includes(search.toLowerCase())
        )
        .map(
          (book: {
            coverPhotoURL: string | undefined;
            author: ReactNode;
            title: string;
          }) => ({
            ...book,
            isFavorite: readingList.some((b) => b.title === book.title), // Check if the book is in the reading list
          })
        );
      setBooks(filteredBooks);
    }
  }, [data, search, readingList]);

  const toggleFavoriteStatus = (book: { author: ReactNode; title: string }) => {
    const { title } = book;

    setBooks((books) =>
      books.map((book) =>
        book.title === title ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );

    const selectedBook = books.find((book) => book.title === title);
    if (selectedBook) {
      if (!selectedBook.isFavorite) {
        addBook(selectedBook);
      } else {
        removeBook(selectedBook);
      }
    }
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(books.map((book) => book.coverPhotoURL));
  console.log(books.map((book) => typeof book.coverPhotoURL));

  return (
    <Grid container spacing={3}>
      {books.map((book, index) => (
        <Grid key={index} item xs={12} sm={8} md={6} lg={3}>
          <Cardy
            coverPhotoURL={book.coverPhotoURL}
            title={book.title}
            author={book.author}
            isFavorite={book.isFavorite}
            toggleFavorite={() => {
              toggleFavoriteStatus(book);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
