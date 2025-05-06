import React, { createContext, useState, ReactNode } from 'react';

interface MovieContextType {
    movies: string[];
    setMovies: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
    children: ReactNode;
}

const MovieProvider = ({ children }: MovieProviderProps) => {
    const [movies, setMovies] = useState<string[]>([]);

    return (
        <MovieContext.Provider value={{ movies, setMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieProvider;
