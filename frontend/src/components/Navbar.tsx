import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useRef } from "react";

const Navbar = ({ setSearch }: { setSearch: (value: string) => void }) => {
  const logoRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    gsap.to(logoRef.current, { scale: 1.2, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(logoRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <Container sx={{ marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              ref={logoRef}
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Ello
            </Link>
          </Typography>
          <SearchBar setSearch={setSearch} />
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
