import { useQuery, gql, useSuspenseQuery, NetworkStatus } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Cardy from "./ui/Cardy";
// import { BOOKS_QUERY } from "../graphql/queries";
import { Button } from "@mui/material";
// import { Book } from "../graphql/types";

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

// const BOOKS_QUERY = gql`
//   query Books($offset: Int, $limit: Int) {
//     books(offset: $offset, limit: $limit) {
//       author
//       coverPhotoURL
//       readingLevel
//       title
//     }
//   }
// `;

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
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [books, setBooks] = useState<
    {
      isFavorite: boolean;
      coverPhotoURL: string | undefined;
      author: ReactNode;
      title: string;
    }[]
  >([]);


  const { error, data, fetchMore, refetch, networkStatus } = useSuspenseQuery(BOOKS_QUERY, {
    variables: { offset: 0, limit },
    fetchPolicy: "network-only",
    pollInterval: 500,
    nextFetchPolicy: 'cache-first', // Used for subsequent executions
  });

  // useEffect(() => {
  //   if (data) {
  //     const filteredBooks = data.books
  //       .filter((book: { title: string }) =>
  //         book.title.toLowerCase().includes(search.toLowerCase())
  //       )
  //       .map(
  //         (book: {
  //           coverPhotoURL: string | undefined;
  //           author: ReactNode;
  //           title: string;
  //         }) => ({
  //           ...book,
  //           isFavorite: readingList.some((b) => b.title === book.title), // Check if the book is in the reading list
  //         })
  //       );
  //     setBooks(filteredBooks);
  //   }
  // }, [data, search, readingList]);

  useEffect(() => {
    if (data) {
      console.log(typeof(data))
      const filteredBooks = data
      .books.filter((book: { title: string }) =>
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
      setBooks((prevBooks) =>
        offset === 0 ? filteredBooks : [...prevBooks, ...filteredBooks]
      );
    }
  }, [data, offset, readingList, search]);

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

  const loadMoreBooks = () => {
    setOffset((prevOffset) => prevOffset + limit);
    fetchMore({
      variables: {
        offset: offset + limit,
        limit,
      },
    });
  };

  // if (loading) return "Loading...";
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (error) return `Error! ${error.message}`;
  // console.log(books.map((book) => book.coverPhotoURL));
  // console.log(books.map((book) => typeof book.coverPhotoURL));

  return (
    <>
      <Button onClick={() => refetch()} >Refresh</Button>
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
      <Button onClick={loadMoreBooks} variant="contained" color="primary" style={{ marginTop: '20px' }}>Load More</Button>
    </>
  );
};

export default BookList;
