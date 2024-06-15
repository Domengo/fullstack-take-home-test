import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC", // Turquoise
    },
    secondary: {
      main: "#F76434", // Orange Red
    },
    error: {
      main: "#FF6B6B", // Example color for error
    },
    warning: {
      main: "#FABD33", // Yellow
    },
    info: {
      main: "#335C6E", // Steel Blue
    },
    success: {
      main: "#4AA088", // Teal
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#53C2C2", // Turquoise dark 1
    },
    background: {
      default: "#CFFAFA", // Turquoise light
    },
  },
  typography: {
    fontFamily: "'Mulish', sans-serif",
    fontSize: 16,
  },
});

theme.typography.body1 = {
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

theme.typography.body2 = {
  fontSize: "0.5rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
  color: "#53C2C2",
};

theme.typography.h1 = {
  fontSize: "6rem",
  "@media (min-width:600px)": {
    fontSize: "6rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "6rem",
  },
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
};

theme.typography.h2 = {
  fontSize: "3rem",
  "@media (min-width:600px)": {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
};

theme.typography.h3 = {
  fontSize: "2.5rem",
  "@media (min-width:600px)": {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
};

theme.typography.h4 = {
  fontSize: "2rem",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
};

theme.typography.h5 = {
  fontSize: "1.5rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.00138em",
  fontStyle: "italic",
  fontVariant: "small-caps",
};

theme.typography.h6 = {
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

