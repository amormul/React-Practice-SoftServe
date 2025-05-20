import {Avatar, Box, InputBase, List, ListItem, ListItemAvatar, ListItemText, Popover} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {useContext, useRef, useState} from "react";
import FavoriteButton from "../FavoriteButton.tsx";
import {MovieContext} from "../../context/MovieProvider.tsx";

interface Film {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
}

function SearchPopover() {
  const boxRef = useRef<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const {searchMovies} = useContext(MovieContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setFilteredFilms(searchMovies(value));
      setAnchorEl(boxRef.current);
    } else {
      setFilteredFilms([]);
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <>
      <Box
        aria-describedby={id}
        ref={boxRef}
        sx={{
          flexGrow: 1,
          display: {xs: 'none', sm: 'flex'},
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 5,
          px: 1,
          mx: 2
        }}
      >
        <SearchIcon sx={{color: 'black'}}/>
        <InputBase
          placeholder="Пошук…"
          onChange={handleInputChange}
          sx={{
            ml: 1,
            flex: 1,
            color: "black"
          }}
          inputProps={{'aria-label': 'search'}}
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            width: anchorEl ? anchorEl.offsetWidth : undefined,
            maxWidth: '100%',
          }
        }}
        sx={{
          borderRadius: 2
        }}
      >
        <List sx={{width: '100%'}}>
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
      </Popover>
    </>
  );
}

export default SearchPopover;