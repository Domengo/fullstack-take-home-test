import { useQuery, gql } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
// import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

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

  // console.log(books.map(book => book.coverPhotoURL));

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 400,
                overflow: "hidden",
                borderRadius: 1,
                color: "white",
              }}
            >
              <Box
                component="img"
                src={book.coverPhotoURL}
                alt={book.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  zIndex: "auto",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  bottom: 2,
                  left: 2,
                  right: 2,
                  zIndex: "tooltip",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">{book.title}</Typography>
                <Typography variant="h4">{book.author}</Typography>
              </Box>

              <IconButton
                aria-label="add"
                onClick={() => addBook(book)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  zIndex: 2,
                }}
              >
                <AddIcon color="secondary" />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5))",
                  zIndex: "dialog",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default BookList;
