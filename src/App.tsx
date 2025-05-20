import NotFoundPage from './pages/NotFound.tsx';
import ProfilePage from "./pages/ProfilePage.tsx"
import MoviePage from "./pages/MoviePage.tsx"
import Layout from './pages/Layout.tsx';
import BannerSlider from "./components/Common/BannerSlider.tsx";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Navbar from "./components/Common/Navbar.tsx";
import FavoritePage from "./pages/FavoritePage.tsx";
import EditProfile from "./components/Profile/EditProfile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<><Navbar/><BannerSlider/></>),
    errorElement: <NotFoundPage />
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      // { path: "/profile/:userId", element: <ProfilePage /> },
      {path: "/favorites", element: <FavoritePage/>},
      {path: "/settings", element: <EditProfile/>},
      {path: "/movie/:movieId", element: <MoviePage/>},
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;