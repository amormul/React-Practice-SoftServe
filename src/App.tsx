

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
import AdminPage from "./pages/AdminPanel.tsx";
import AdminAuthForm from "./components/admin/AdminAuthForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import TicketBooking from "./pages/TicketBooking.tsx";
import AuthForm from "./components/AuthForm.tsx";
import TicketView from "./components/TicketView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFoundPage />

  },
  {
    path: "/admin",
    element:
    <ProtectedRoute requiredRoleId={3}>
      <AdminPage/>
    </ProtectedRoute>,
  },
  {
    path: "/buy_tickets",
    element:
        <ProtectedRoute requiredRoleId={4}>
          <TicketBooking/>
        </ProtectedRoute>,
  },
  {
    path: "/tickets",
    element:
        <ProtectedRoute requiredRoleId={4}>
          <TicketView/>
        </ProtectedRoute>,
  },
  {
    path: "/admin/login",
    element: <AdminAuthForm/>,
  },
  {
    path: "/login",
    element: <AuthForm/>,
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