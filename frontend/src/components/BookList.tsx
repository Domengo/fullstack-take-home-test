import { useQuery, NetworkStatus } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Cardy from "./ui/Cardy";
import {
  Button,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";
import { BOOKS_QUERY } from "../graphql/queries";

type Book = {
  id: number;
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  isFavorite?: boolean; 
}

type BooksData = {
  books: Book[];
};

type BookListContext = {
  search: string;
  addBook: (book: { author: ReactNode; title: string }) => void;
  removeBook: (book: { author: ReactNode; title: string }) => void;
  readingList: Array<{ author: ReactNode; title: string }>;
};

const BookList = () => {
  const { search, addBook, removeBook, readingList } =
    useOutletContext<BookListContext>();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [books, setBooks] = useState<
    {
      isFavorite: boolean;
      coverPhotoURL: string | undefined;
      author: ReactNode;
      title: string;
    }[]
  >([]);

  const { error, data:responseData, fetchMore, refetch, networkStatus } = useQuery(
    BOOKS_QUERY,
    {
      variables: { offset: 0, limit },
      fetchPolicy: "network-only",
      pollInterval: 15500,
      notifyOnNetworkStatusChange: true,
    }
  );

  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  useEffect(() => {
    // console.log('responseData', responseData);
    if (responseData) {
      const data = responseData as unknown as BooksData;

      if (data.books.length < limit) {
        setHasMoreBooks(false);
      } else {
        setHasMoreBooks(true); // If not, there may still be more books
      }

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
  }, [responseData, offset, readingList, search, limit]);

  const toggleFavoriteStatus = (book: { author: ReactNode; title: string }) => {
    const { title, author } = book;

    setBooks((books) =>
      books.map((book) =>
        book.title === title ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );

    // const selectedBook = books.find((book) => book.title === title);
    const selectedBook = books.find((book) => (book.title === title && book.author === author));
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

  const handleLimitChange = (event: SelectChangeEvent<string>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setOffset(0); // Reset offset whenever the limit changes
    refetch({ offset: 0, limit: newLimit }); // Refetch with the new limit
  };

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={networkStatus === NetworkStatus.refetch}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "75px",
        }}
      >
        <Button
          onClick={() => refetch()}
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        >
          Refresh <RefreshOutlined />
        </Button>
        <FormControl
          sx={{
            marginBottom: "20px",
            minWidth: 120,
          }}
        >
          <InputLabel
            id="limit-select-label"
            // sx={{ marginBottom: "10px" }}
          >
            Limit
          </InputLabel>
          <Select
            labelId="limit-select-label"
            id="limit-select"
            value={limit.toString()} // Convert limit to a string
            onChange={handleLimitChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button
          onClick={loadMoreBooks}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          disabled={!hasMoreBooks}
        >
          Load More
        </Button>
      </Box>
    </>
  );
};

export default BookList;
