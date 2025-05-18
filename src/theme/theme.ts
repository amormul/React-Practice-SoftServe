import {createTheme} from "@mui/material/styles";

const darkRedTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#171717",
      paper: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    h1: {
      fontFamily: "'Poppins', sans-serif", // Example for headers
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FF0000",
          color: "#FFFFFF",
        },
      },
    },
  },
});

export default darkRedTheme;