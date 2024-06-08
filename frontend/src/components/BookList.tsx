import { useQuery, gql } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const BOOKS_QUERY = gql`
  query Books { books { author coverPhotoURL readingLevel title } }
`;

const BookList = ({search, addBook}) => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  const [books, setBooks] = useState<{
      author: ReactNode; title: string 
}[]>([]);

  useEffect(() => {
    if (data) {
      setBooks(data.books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase())));
    }
  }, [data, search]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <List>
      {books.map((book, index) => (
        <ListItem key={index}>
          <ListItemText primary={book.title} secondary={book.author} />
          <IconButton aria-label="add" onClick={() => addBook(book)}>
          <AddIcon color='primary' />
        </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;