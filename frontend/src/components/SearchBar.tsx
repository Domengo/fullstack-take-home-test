import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import in
import gsap from "gsap";

const SearchBar = ({ setSearch }: { setSearch: (search: string) => void }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);

  // const [input, setInput] = useState('');

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSearch(inputRef.current?.value || "");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const toggleInputVisibility = () => {
    if (inputVisible) {
      gsap.to(containerRef.current, { width: "40px", duration: 0.5 });
      gsap.to(inputRef.current, { opacity: 0, duration: 0.5, onComplete: () => setInputVisible(false) });
    } else {
      setInputVisible(true);
      gsap.to(containerRef.current, { width: "200px", duration: 0.5 });
      gsap.to(inputRef.current, { opacity: 1, duration: 0.5 });
      inputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", alignItems: "center" }}
      ref={containerRef}
    >
      <TextField
        inputRef={inputRef}
        placeholder="Search Books"
        variant="outlined"
        size="small"
        // label="search"
        onChange={handleInputChange}
        
        // value={input}
        // onChange={(event) => setInput(event.target.value)}
        // style={{ marginRight: "10px", opacity: 0, transition: 'opacity 0.5s ease' }}
        // sx={{ width: "100%" }}
        sx={{ opacity: inputVisible ? 1 : 0, transition: 'opacity 0.5s ease', marginRight: 1 }}
      />
      <IconButton onClick={toggleInputVisibility}>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
