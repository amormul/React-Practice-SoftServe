import {Favorite, FavoriteBorder} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useContext} from "react";
import {UserContext} from "../context/AuthProvider.tsx";
import {useSnackbar} from "../context/SnackbarProvider.tsx";
import {useAuthDialog} from "../context/AuthDialogContext.tsx";

interface FavoriteButtonProps {
  title: string;
  posterUrl: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({title, posterUrl}) => {
  const {isLoggedIn, isFilmInFavorites, addFavoriteFilm, removeFavoriteFilm} = useContext(UserContext);
  const {showSnackbar} = useSnackbar();
  const {openAuthDialog} = useAuthDialog();

  return (
    <IconButton
      onClick={() => {
        if (!isLoggedIn()) return openAuthDialog();
        if (!isFilmInFavorites(title)) {
          addFavoriteFilm(title, posterUrl);
          showSnackbar("Додано до Обраних", "info");
        } else {
          removeFavoriteFilm(title);
          showSnackbar("Видалено з Обраних", "warning");
        }
      }}
      size="large"
      title={isFilmInFavorites(title) ? "Видалити з Обраних" : "Додати до Обраних"}
    >
      {isFilmInFavorites(title) ? (
        <Favorite fontSize="inherit" color="error"/>
      ) : (
        <FavoriteBorder fontSize="inherit"/>
      )}
    </IconButton>
  );
};

export default FavoriteButton;