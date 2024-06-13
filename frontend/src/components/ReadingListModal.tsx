import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ReactNode } from "react";

export type Book = {
  title: string;
  author: ReactNode;
};

interface ReadingListModalProps {
  open: boolean;
  handleClose: () => void;
  readingList: Book[];
  removeBook: (book: Book) => void;
}

const ReadingListModal = ({
  open,
  handleClose,
  readingList,
  removeBook,
}: ReadingListModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Your Reading List</DialogTitle>
      <DialogContent>
        <List>
          {readingList.map((book: Book, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={book.title} secondary={book.author} />
              <Tooltip title="Remove from reading list" arrow>
                <IconButton
                  aria-label="remove"
                  onClick={() => removeBook(book)}
                >
                  <RemoveCircleOutlineIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ReadingListModal;
