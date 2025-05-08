
import React from 'react';
import ActorSlider from './components/ActorSlider';
import { actors } from './data/actors';

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <ActorSlider 
          actors={actors} 
          title="Знімальна група та акторський склад" 
        />
      </div>
    </div>
  );
}

export default App;


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

