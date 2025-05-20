import React, {useEffect, useState} from "react";
import {Box, Grid, MenuItem, TextField} from "@mui/material";
import MediaCard from "../components/Card/MediaCard.tsx";
import FavoriteButton from "../components/FavoriteButton.tsx";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  description: string;
  genres: [string];
}

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState({
    year: "",
    title: "",
    genre: "",
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/src/data/filmData.json");
        if (!response.ok) throw new Error("Failed to fetch movies data");
        const data = await response.json();
        setMovies(data.films);
        setFilteredMovies(data.films);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const {year, title, genre} = filters;
      const filtered = movies.filter((movie) => {
        const matchesYear = year ? movie.releaseDate.startsWith(year) : true;
        const matchesTitle = title
          ? movie.title.toLowerCase().includes(title.toLowerCase())
          : true;
        const matchesGenre = genre ? movie.genres.includes(genre) : true;
        return matchesYear && matchesTitle && matchesGenre;
      });
      setFilteredMovies(filtered);
    };

    applyFilters();
  }, [filters, movies]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFilters((prev) => ({...prev, [name]: value}));
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{xs: "column", sm: "row"}}
        gap={2}
        alignItems={{xs: "stretch", sm: "center"}}
      >
        <TextField
          label="Year"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          variant="outlined"
          fullWidth
          sx={{maxWidth: {xs: "100%", sm: 150}}}
        />
        <TextField
          label="Title"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          variant="outlined"
          fullWidth
          sx={{maxWidth: {xs: "100%", sm: 250}}}
        />
        <TextField
          label="Genre"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{minWidth: {xs: "100%", sm: 100}}}
          select
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Наукова фантастика">Наукова фантастика</MenuItem>
          <MenuItem value="Драма">Драма</MenuItem>
          <MenuItem value="Екшн">Екшн</MenuItem>
          <MenuItem value="Кримінал">Кримінал</MenuItem>
        </TextField>
      </Box>
      <Grid container spacing={2}>
        {filteredMovies.map((movie) => (
          <Grid key={movie.id}>
            <MediaCard
              title={movie.title}
              imageUrl={movie.posterUrl}
              description={movie.releaseDate}
              path={`/movie/${movie.title}`}
              IconComponent={<FavoriteButton title={movie.title} posterUrl={movie.posterUrl}/>}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MoviesPage;