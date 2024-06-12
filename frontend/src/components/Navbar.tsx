import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Navbar = ({ setSearch }: { setSearch: (value: string) => void }) => {

  return (
    <Container sx={{ marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
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
