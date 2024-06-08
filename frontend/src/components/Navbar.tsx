import React from 'react';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons/Search';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'fade(#fff, 0.15)',
    '&:hover': {
      backgroundColor: 'fade(#fff, 0.25)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

const Navbar = ({ setSearch }) => {
  const classes = useStyles();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' style={{color: 'white', textDecoration: 'none'}}>Ello</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
                placeholder='Search Books…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;