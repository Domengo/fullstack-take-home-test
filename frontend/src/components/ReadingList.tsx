import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { theme } from "./ui/Theme";
// import Box from "@mui/material/Box";

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
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: theme.palette.text.secondary }}
      >
        Your Reading List
      </Typography>
      <List>
        {readingList.map((book: Book, index: number) => (
          <ListItem key={index}>
            <Typography variant="h6">
              {/*  primary={book.title} secondary={book.author} /> */}
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {book.title}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {book.author}
                  </Typography>
                }
              />
            </Typography>
            <IconButton aria-label="remove" onClick={() => removeBook(book)}>
              <RemoveCircleOutlineIcon color="secondary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ReadingList;
