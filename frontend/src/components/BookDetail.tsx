import { useParams, useHistory } from 'react-router-dom';
import { ReactNode, useEffect, useState } from "react";
import { Box, Typography, IconButton, ThemeProvider, Card, CardContent, CardMedia, CardActions, Tooltip } from "@mui/material";
import { FavoriteRounded, FavoriteBorderOutlined, ArrowBack } from "@mui/icons-material";
import { theme } from "./ui/Theme";
import { Book } from '../graphql/types';

type BookDetailProps = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (book: Book) => void;
  readingList: never[];
};

const BookDetail = ({ books, addBook, removeBook, readingList }: BookDetailProps) => {
  const { title } = useParams<{ title: string }>();
  const history = useHistory();
  const [book, setBook] = useState<Book | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const book = books.find((book) => book.title === title);
    if (book) {
      setBook(book);
      setIsFavorite(readingList.some((b) => b.title === book.title));
    }
  }, [title, books, readingList]);

  if (!book) return <div>Book not found</div>;

  const toggleFavoriteStatus = () => {
    if (isFavorite) {
      removeBook(book);
    } else {
      addBook(book);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 800, margin: '0 auto', marginTop: '20px' }}>
        <CardMedia
          component="img"
          height="500"
          image={book.coverPhotoURL}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h4" component="div">
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reading Level: {book.readingLevel}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Tooltip title="Back to list">
            <IconButton onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Tooltip title={isFavorite ? "Remove from reading list" : "Add to reading list"}>
            <IconButton aria-label="favorite" onClick={toggleFavoriteStatus}>
              {isFavorite ? <FavoriteRounded color="secondary" /> : <FavoriteBorderOutlined color="secondary" />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default BookDetail;