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
import EditProfile from "./components/Profile/EditProfile.tsx";
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import AdminAuthForm from "./components/admin/AdminAuthForm.tsx";
import SeatPicker from "./components/SeatPicker.tsx";
import AuthForm from "./components/AuthForm.tsx";
import TicketView from "./components/TicketView.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<><Navbar/><BannerSlider/></>),
        errorElement: <NotFoundPage/>
    },
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: "/profile/", element:
                    <ProtectedRoute requiredRoleId={4}>
                        <ProfilePage/>
                    </ProtectedRoute>,
            },
            {path: "/settings", element: <EditProfile/>},
            {path: "/movie/:movieId", element: <MoviePage/>},
            {path: "/movies", element: <CatalogPage/>},
            {
                path: "/buy_tickets", element:
                    <ProtectedRoute requiredRoleId={4}>
                        <><Navbar/> <SeatPicker/></>
                    </ProtectedRoute>
            },
            {
                path: "/tickets",
                element:
                    <ProtectedRoute requiredRoleId={4}>
                        <><Navbar/> <TicketView/></>
                    </ProtectedRoute>,
            },
            {
                path: "/login",
                element:
                    <AuthForm/>
            },
        ]
    },
    {
        path: "/admin",
        element:
            <ProtectedRoute requiredRoleId={3}>
                <AdminPanel/>
            </ProtectedRoute>,
    },

    {
        path: "/user",
        element:
            <ProtectedRoute requiredRoleId={4}>
                <ProfilePage/>
            </ProtectedRoute>,
    },


    {
        path: "/admin/login",
        element: <AdminAuthForm/>,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>

    );
}

export default App;