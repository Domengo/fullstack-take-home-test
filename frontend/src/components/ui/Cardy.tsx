import { ReactNode, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  ThemeProvider,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Tooltip,
} from "@mui/material";
import { theme } from "./Theme";
import { FavoriteRounded, FavoriteBorderOutlined } from "@mui/icons-material";
import gsap from "gsap";

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
  const iconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (icon) {
      const animateFavorite = () => {
        gsap.fromTo(
          icon,
          { scale: 1 },
          {
            scale: 1.5,
            duration: 0.3,
            ease: "elastic.out(1, 0.75)",
            yoyo: true,
            repeat: 1,
          }
        );
      };

      icon.addEventListener("click", animateFavorite);
      return () => {
        icon.removeEventListener("click", animateFavorite);
      };
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 345,
          height: { xs: 300, sm: 350, md: 400 },
          position: "relative",
          boxShadow: 3,
        }}
      >
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: "tooltip",
              color: "white",
            }}
          >
            <Tooltip title="title">
              <Typography variant="body1" gutterBottom>
                {title}
              </Typography>
            </Tooltip>
            <Tooltip title="author">
              <Typography variant="body2" gutterBottom>
                {author}
              </Typography>
            </Tooltip>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{ position: "absolute", right: "10px", top: "10px", zIndex: 2 }}
        >
          <Tooltip title="add to reading list">
            <IconButton
              aria-label="favorite"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
              ref={iconRef}
            >
              {isFavorite ? (
                <FavoriteRounded color="secondary" />
              ) : (
                <FavoriteBorderOutlined color="secondary" />
              )}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Cardy;
