import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Actor {
  name: string;
  role: string;
  photoUrl: string;
}

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

interface RelatedFilm {
  id: number;
  title: string;
  posterUrl: string;
}

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  releaseDate: string;
  description: string;
  IMDbRating: number;
  genres: string[];
  duration: string;
  language: string;
  director: string;
  actors: Actor[];
  reviews: Review[];
  relatedFilms: RelatedFilm[];
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
        const response = await fetch('/src/data/filmData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovies(data.films);
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