import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {Api} from "../components/api/config"

interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  rating: number;
  year: number;
  director: { id: number; name: string } | null;
  genres: { id: number; name: string }[];
  actors: { id: number; name: string; char_name: string }[];
}

interface MovieContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(Api.MOVIES_ADMIN);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;