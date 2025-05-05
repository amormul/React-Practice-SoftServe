
import NotFoundPage from './pages/NotFound.tsx';
import MainPage from "./pages/MainPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx"
import MoviePage from "./pages/MoviePage.tsx"
import MovieProvider from "./context/MovieProvider.tsx"
import './App.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

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
    path: "/movie/:movieId",
    element: <MoviePage />,
    errorElement: <NotFoundPage />
  }
]);


//  Основне тіло Застосунку
function App() {


  return (
    <>
      <div className="AppDiv">
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </div>
    </>
  )
}


export default App