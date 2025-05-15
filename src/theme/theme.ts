import {createTheme} from "@mui/material/styles";

const darkRedTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#b71c1c", // Dark red
    },
    secondary: {
      main: "#ffffff", // White
    },
    background: {
      default: "#121212", // Dark background
      paper: "#000000", // Slightly lighter dark background
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#ffcccb", // Light red text
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    h1: {
      fontFamily: "'Roboto Slab', serif", // Example for headers
      fontWeight: 700,
    },
    body1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      textTransform: "capitalize",
    },
  },
});

export default darkRedTheme;