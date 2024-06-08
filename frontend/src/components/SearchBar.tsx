import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = ({ setSearch }: { setSearch: (search: string) => void }) => {
  const [input, setInput] = useState('');

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        label='Search Books'
        variant='outlined'
        value={input}
        onChange={(event) => setInput(event.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant='contained' color='primary' type='submit'>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;