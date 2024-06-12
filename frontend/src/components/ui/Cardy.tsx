import { ReactNode } from "react";
import { Box, IconButton, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 16,
  },
});

theme.typography.body2 = {
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
};

const Cardy = ({
  coverPhotoURL,
  title,
  author,
  addBook,
}: {
  coverPhotoURL: string | undefined;
  title: string;
  author: ReactNode;
  addBook: () => void;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, position: "relative", height: 350, overflow: "hidden", color: "white", boxShadow: 3 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={coverPhotoURL}
            alt={title}
            sx={{ width: "100%", height: "100%", position: "absolute", zIndex: "auto" }}
          />
          <CardContent>
            <Typography variant="body2" gutterBottom>{title}</Typography>
            <Typography variant="body2" gutterBottom>{author}</Typography>
          </CardContent>
          <Box
            component="img"
            src={coverPhotoURL}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              zIndex: "auto",
            }}
          />
          <IconButton
            aria-label="add"
            onClick={addBook}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              zIndex: 2,
            }}
          >
            <AddIcon color="secondary" />
          </IconButton>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
};

export default Cardy;