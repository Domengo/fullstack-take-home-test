import { ReactNode } from "react";
import {
  Box,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@mui/material";

import { FavoriteRounded, FavoriteBorderOutlined } from "@mui/icons-material";

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
  isFavorite,
  toggleFavorite,
}: {
  coverPhotoURL: string | undefined;
  title: string;
  author: ReactNode;
  isFavorite: boolean;
  toggleFavorite: () => void;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, height: { xs: 300, sm: 350, md: 400 } , position: "relative", boxShadow: 3 }}>
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            height="350"
            image={coverPhotoURL}
            alt={title}
            sx={{
              objectFit: "cover",
              height: "100%",
              position: "relative",
              zIndex: "auto",
            }}
          />
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
          <CardContent
            sx={{
              position: "absolute",
              bottom: 2,
              left: 2,
              right: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: "tooltip",
              color: "white",
            }}
          >
            <Typography variant="body2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {author}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: 2,
          }}
        >
          <IconButton aria-label="favorite" onClick={toggleFavorite}>
          {isFavorite ? <FavoriteRounded color="secondary" /> : <FavoriteBorderOutlined color="secondary" />}
          </IconButton>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Cardy;
