import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
import Container from "@mui/material/Container";
// import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Navbar = ({ setSearch }: { setSearch: (value: string) => void }) => {
  // const handleSearch = (e: { target: { value: string } }) => {
  //   setSearch(e.target.value);
  // };

  return (
    // <Container
    //   sx={{
    //     marginBottom: 2,
    //   }}
    // >
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography
    //         variant="h6"
    //         sx={{
    //           flexGrow: 1,
    //           display: "none",
    //         }}
    //       >
    //         <Link to="/" style={{ color: "white", textDecoration: "none" }}>
    //           Ello
    //         </Link>
    //       </Typography>
    //       <Container
    //         sx={{
    //           position: "relative",
    //           borderRadius: 5,
    //           backgroundColor: "fade(#fff, 0.15)",
    //           "&:hover": {
    //             backgroundColor: "fade(#fff, 0.25)",
    //           },
    //           marginRight: 2,
    //           marginLeft: 0,
    //           width: "100%",
    //         }}
    //       >
    //         <Container
    //           sx={{
    //             padding: 2,
    //             height: "100%",
    //             position: "absolute",
    //             pointerEvents: "none",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <SearchIcon />
    //         </Container>
    //         <InputBase
    //           placeholder="Search Books…"
    //           inputProps={{ "aria-label": "search" }}
    //           onChange={handleSearch}
    //         />
    //       </Container>
    //     </Toolbar>
    //   </AppBar>
    // </Container>
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
