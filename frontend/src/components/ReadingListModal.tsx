import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ReactNode } from "react";
import { theme } from "./ui/Theme"; // Import theme from Theme.ts

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
    <Typography variant="h6" sx={{
      backgroundColor: theme.palette.background.paper,
    }}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Typography variant="h5">
          <DialogTitle>Your Reading List</DialogTitle>
        </Typography>

        <DialogContent>
          <List>
            {readingList.map((book: Book, index: number) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <Typography sx={{ color: theme.palette.info.main }}>
                      {book.title}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: theme.palette.text.light}}>
                      {book.author}
                    </Typography>
                  }
                />
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
    </Typography>
  );
};

export default ReadingListModal;
