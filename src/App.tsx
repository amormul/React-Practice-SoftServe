import NotFoundPage from './pages/NotFound.tsx';
import MainPage from "./pages/MainPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx"
import MoviePage from "./pages/MoviePage.tsx"
import MovieProvider from "./context/MovieProvider.tsx"
import EditProfile from "./components/Profile/EditProfile.tsx";
import { ThemeProvider } from '@emotion/react';
import {CssBaseline} from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import darkTheme from './theme/theme.ts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/profile/editProfile",
    element: <EditProfile />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/movie/:movieId",
    element: <MoviePage />,
    errorElement: <NotFoundPage />
  }
]);

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </ThemeProvider>
    </>
  );
}


export default App