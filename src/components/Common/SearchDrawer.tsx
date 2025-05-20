import React, {useContext, useState} from 'react';
import {Avatar, Box, Drawer, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {MovieContext} from '../../context/MovieProvider';
import FavoriteButton from "../FavoriteButton.tsx";

interface Film {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
}

const SearchDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const {searchMovies} = useContext(MovieContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setFilteredFilms(value ? searchMovies(value) : []);
  };

  return (
    <>
      <IconButton
        aria-label="search"
        onClick={handleOpen}
        sx={{display: {xs: 'flex', sm: 'none'}}}
      >
        <SearchIcon/>
      </IconButton>
      <Drawer anchor="top" open={open} onClose={handleClose}>
        <Box sx={{display: 'flex', alignItems: 'center', padding: 1}}>
          <InputBase
            placeholder="Пошук…"
            value={searchQuery}
            onChange={handleInputChange}
            sx={{
              ml: 2,
              flex: 1
            }}
            inputProps={{'aria-label': 'search'}}
          />
          <IconButton onClick={handleClose}>
            <CloseIcon/>
          </IconButton>
        </Box>
        <List>
          {filteredFilms.map((film) => (
            <ListItem
              key={film.id}
              component="div"
              sx={{textDecoration: 'none', color: 'inherit'}}
              secondaryAction={<FavoriteButton title={film.title} posterUrl={film.posterUrl}/>}
            >
              <Box
                component="a"
                href={`/movie/${film.title}`}
                sx={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', flex: 1}}
              >
                <ListItemAvatar>
                  <Avatar
                    src={film.posterUrl}
                    alt={film.title}
                    variant="square"
                    sx={{width: 50, height: 65}}
                  />
                </ListItemAvatar>
                <Box sx={{ml: 2, flex: 1}}>
                  <ListItemText
                    primary={film.title}
                    secondary={film.releaseDate}
                  />
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SearchDrawer;