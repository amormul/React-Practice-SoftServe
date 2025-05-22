import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import App from "./App.tsx";
import darkTheme from "./theme/theme.ts";
import {CssBaseline} from "@mui/material";
import {AuthProvider} from "./context/AuthProvider.tsx";
import MovieProvider from "./context/MovieProvider.tsx";
import {ThemeProvider} from "@emotion/react";
import {SnackbarProvider} from "./context/SnackbarProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <AuthProvider>
        <SnackbarProvider>
            <MovieProvider>
              <App/>
            </MovieProvider>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);