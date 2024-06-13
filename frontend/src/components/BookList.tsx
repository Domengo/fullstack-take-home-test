// import { gql, useSuspenseQuery, NetworkStatus } from "@apollo/client";
// import { ReactNode, useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
// import Cardy from "./ui/Cardy";
// // import { BOOKS_QUERY } from "../graphql/queries";
// import { Button, Backdrop, CircularProgress } from "@mui/material";
// // import { Book } from "../graphql/types";

// const BOOKS_QUERY = gql`
//   query Books {
//     books {
//       author
//       coverPhotoURL
//       readingLevel
//       title
//     }
//   }
// `;

// const BookList = ({
//   search,
//   addBook,
//   removeBook,
//   readingList,
// }: {
//   search: string;
//   addBook: (book: { author: ReactNode; title: string }) => void;
//   removeBook: (book: { author: ReactNode; title: string }) => void;
//   readingList: Array<{ author: ReactNode; title: string }>;
// }) => {
//   const [offset, setOffset] = useState(0);
//   const [limit] = useState(10);
//   const [books, setBooks] = useState<
//     {
//       isFavorite: boolean;
//       coverPhotoURL: string | undefined;
//       author: ReactNode;
//       title: string;
//     }[]
//   >([]);

//   const { error, data, fetchMore, refetch, networkStatus } = useSuspenseQuery(
//     BOOKS_QUERY,
//     {
//       variables: { offset: 0, limit },
//       fetchPolicy: "network-only",
//       pollInterval: 500,
//       nextFetchPolicy: "cache-first", // Used for subsequent executions
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       console.log(typeof data);
//       const filteredBooks = data.books
//         .filter((book: { title: string }) =>
//           book.title.toLowerCase().includes(search.toLowerCase())
//         )
//         .map(
//           (book: {
//             coverPhotoURL: string | undefined;
//             author: ReactNode;
//             title: string;
//           }) => ({
//             ...book,
//             isFavorite: readingList.some((b) => b.title === book.title), // Check if the book is in the reading list
//           })
//         );
//       setBooks((prevBooks) =>
//         offset === 0 ? filteredBooks : [...prevBooks, ...filteredBooks]
//       );
//     }
//   }, [data, offset, readingList, search]);

//   const toggleFavoriteStatus = (book: { author: ReactNode; title: string }) => {
//     const { title } = book;

//     setBooks((books) =>
//       books.map((book) =>
//         book.title === title ? { ...book, isFavorite: !book.isFavorite } : book
//       )
//     );

//     const selectedBook = books.find((book) => book.title === title);
//     if (selectedBook) {
//       if (!selectedBook.isFavorite) {
//         addBook(selectedBook);
//       } else {
//         removeBook(selectedBook);
//       }
//     }
//   };

//   const loadMoreBooks = () => {
//     setOffset((prevOffset) => prevOffset + limit);
//     fetchMore({
//       variables: {
//         offset: offset + limit,
//         limit,
//       },
//     });
//   };

//   // if (loading) return "Loading...";
//   // if (networkStatus === NetworkStatus.refetch) return "Refetching!";
//   if (error) return `Error! ${error.message}`;
//   // console.log(books.map((book) => book.coverPhotoURL));
//   // console.log(books.map((book) => typeof book.coverPhotoURL));

//   return (
//     <>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={networkStatus === NetworkStatus.refetch}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <Button
//         onClick={() => refetch()}
//         variant="outlined"
//         sx={{ marginBottom: "20px" }}
//       >
//         Refresh
//       </Button>
//       <Grid container spacing={3}>
//         {books.map((book, index) => (
//           <Grid key={index} item xs={12} sm={8} md={6} lg={3}>
//             <Cardy
//               coverPhotoURL={book.coverPhotoURL}
//               title={book.title}
//               author={book.author}
//               isFavorite={book.isFavorite}
//               toggleFavorite={() => {
//                 toggleFavoriteStatus(book);
//               }}
//             />
//           </Grid>
//         ))}
//       </Grid>
//       <Button
//         onClick={loadMoreBooks}
//         variant="contained"
//         color="primary"
//         style={{ marginTop: "20px" }}
//       >
//         Load More
//       </Button>
//     </>
//   );
// };

// export default BookList;

import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Cardy from "./ui/Cardy";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { useOutletContext } from "react-router-dom";

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

type BookListContext = {
  search: string;
  addBook: (book: { author: ReactNode; title: string }) => void;
  removeBook: (book: { author: ReactNode; title: string }) => void;
  readingList: Array<{ author: ReactNode; title: string }>;
};

const BookList = () => {
  const { search, addBook, removeBook, readingList } = useOutletContext<BookListContext>();

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

  const { error, data, fetchMore, refetch, networkStatus } = useQuery(BOOKS_QUERY, {
    variables: { offset: 0, limit },
    fetchPolicy: "network-only",
    pollInterval: 500,
    notifyOnNetworkStatusChange: true,
  });

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

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={networkStatus === NetworkStatus.refetch}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <Button onClick={() => refetch()} variant="outlined" sx={{ marginBottom: "20px" }}>
        Refresh
      </Button>
      
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
      
      <Button
        onClick={loadMoreBooks}
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Load More
      </Button>
    </>
  );
};

export default BookList;