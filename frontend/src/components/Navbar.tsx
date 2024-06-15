import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useState, useRef, ReactNode } from "react";
import { Book } from "./ReadingListModal";
import ReadingListModal from "./ReadingListModal";
import CssBaseline from "@mui/material/CssBaseline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HideOnScroll from "./HideOnScroll";
import {
  AppBar,
  Tooltip,
  Badge,
  IconButton,
  Container,
  Typography,
  Toolbar,
} from "@mui/material";

const Navbar = ({
  setSearch,
  readingList,
  removeBook,
}: {
  setSearch: (value: string) => void;
  readingList: Book[];
  removeBook: (book: { title: string; author: ReactNode }) => void;
}) => {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseEnter = () => {
    gsap.to(logoRef.current, { scale: 1.2, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(logoRef.current, { scale: 1, duration: 0.3 });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Container sx={{ marginBottom: 2 }}>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, display: "block" }}>
              <Link
                ref={logoRef}
                to="/"
                style={{ color: "white", textDecoration: "none" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Ello Books
              </Link>
            </Typography>
            <SearchBar setSearch={setSearch} />
            <Tooltip title="Reading List" arrow>
              <IconButton onClick={handleModalOpen} sx={{ color: "white" }}>
                <Badge badgeContent={readingList.length} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ReadingListModal
        open={modalOpen}
        handleClose={handleModalClose}
        readingList={readingList}
        removeBook={removeBook}
      />
    </Container>
  );
};

export default Navbar;
