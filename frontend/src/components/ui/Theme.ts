import {createTheme} from '@mui/material';

export const theme = createTheme({
    palette: {
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      fontFamily: "'Mulish', sans-serif",
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
  