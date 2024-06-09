import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   flexGrow: 1,
  //   display: 'none',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'block',
  //   },
  // },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: 'fade(#fff, 0.15)',
  //   '&:hover': {
  //     backgroundColor: 'fade(#fff, 0.25)',
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // inputRoot: {
  //   color: "inherit",
  // },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
};

const Navbar = ({ setSearch }) => {
  

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: "none",
              [theme.breakpoints.up("sm")]: {
                display: "block",
              },
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Ello
            </Link>
          </Typography>
          <Container
            sx={{
              position: "relative",
              borderRadius: theme.shape.borderRadius,
              backgroundColor: "fade(#fff, 0.15)",
              "&:hover": {
                backgroundColor: "fade(#fff, 0.25)",
              },
              marginRight: theme.spacing(2),
              marginLeft: 0,
              [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto",
              },
            }}
          >
            <Container sx={
              {
                padding: theme.spacing(0, 2),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            }>
              <SearchIcon />
            </Container>
            <InputBase
              placeholder="Search Books…"
              sx={{ padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)` }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Container>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
