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
      
      <Box
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
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {author}
          </Typography>
        </Box>

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

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px), linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)",
            zIndex: "dialog",
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Cardy;
