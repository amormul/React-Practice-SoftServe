import React, {useContext} from "react";
import {Box, Typography} from "@mui/material";
import {UserContext} from "../context/AuthProvider.tsx";
import MediaCard from "../components/Card/MediaCard.tsx";
import FavoriteButton from "../components/FavoriteButton.tsx";

const FavoritePage: React.FC = () => {
  const {user} = useContext(UserContext);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Обрані фільми
      </Typography>
      {user.favoriteFilms && user.favoriteFilms.length > 0 ? (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={2}
        >
          {user.favoriteFilms.map((film, index) => (
            <MediaCard
              key={index}
              id={index}
              title={film.title}
              imageUrl={film.posterUrl}
              path={`/movie/${film.title}`}
              IconComponent={<FavoriteButton title={film.title} posterUrl={film.posterUrl}/>}
            />
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography color="text.secondary">
            У вас ще немає обраних фільмів.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default FavoritePage;