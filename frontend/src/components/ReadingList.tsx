import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ReactNode } from 'react';

type Book = {
  title: string;
  author: ReactNode;
};

interface ReadingListProps {
  readingList: Book[];
  removeBook: (book: Book) => void;
}

const ReadingList = ({ readingList, removeBook }: ReadingListProps) => {
  return (
    <>
      <h2>Your Reading List</h2>
      <List>
        {readingList.map((book: Book, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={book.title} secondary={book.author} />
            
            <IconButton aria-label="remove" onClick={() => removeBook(book)}>
              <RemoveCircleOutlineIcon color='secondary' />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ReadingList;