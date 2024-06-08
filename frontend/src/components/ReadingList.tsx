import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ReadingList = ({ readingList, removeBook }) => {
  return (
    <>
      <h2>Your Reading List</h2>
      <List>
        {readingList.map((book, index) => (
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