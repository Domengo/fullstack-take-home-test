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
import Card from "./ui/Card";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#3f51b5",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//   },
//   typography: {
//     fontFamily: "Roboto",
//     fontSize: 16,
//   },
// });

// theme.typography.body2 = {
//   fontSize: "1rem",
//   "@media (min-width:600px)": {
//     fontSize: "1rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "1rem",
//   },
//   fontWeight: 500,
//   lineHeight: 1,
//   letterSpacing: "0.00138em",
//   fontStyle: "italic",
//   fontVariant: "small-caps",
// };

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
  // () => addBook(book)
  // console.log(books.map(book => book.coverPhotoURL));

  return (
    // <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid key={index} item xs={12} sm={8} md={6} lg={3}>
            <Card
              coverPhotoURL={book.coverPhotoURL}
              title={book.title}
              author={book.author}
              addBook={() => addBook(book)}
            />
            {/* <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 350,
                overflow: "hidden",
                borderRadius: 1,
                color: "white",
                boxShadow: 3,
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
                  gap: 2,
                  zIndex: "tooltip",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {book.author}
                </Typography>
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
                    // "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.3)30%, rgba(0,0,0,0) 80%, rgba(0,0,0,4.3))"
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px), linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)',
                  zIndex: "dialog",
                }}
              />
            </Box> */}
          </Grid>
        ))}
      </Grid>
    // </ThemeProvider>
  );
};

export default BookList;
