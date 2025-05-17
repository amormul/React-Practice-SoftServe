import {Avatar, Box, InputBase, List, ListItem, ListItemAvatar, ListItemText, Popover} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {useRef, useState} from "react";
import {Google} from "@mui/icons-material";

interface Film {
  id: number;
  title: string;
  releaseDate: string;
}

function SearchPopover() {
  const boxRef = useRef<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [query, setQuery] = useState<string>('')
  const [films, setFilms] = useState<Film[]>([
    { id: 1, title: 'Inception', releaseDate: '2010' },
    { id: 2, title: 'Interstellar', releaseDate: '2014' },
    { id: 3, title: 'Dunkirk', releaseDate: '2017' },
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      setAnchorEl(boxRef.current);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClick = () => {
    setAnchorEl(boxRef.current)
  }

  const handleClose = () => {
    setAnchorEl(null);
    setQuery('');
  };

  const open = Boolean(anchorEl);
  console.log(open)
  const id = open ? 'search-popover' : undefined;

  return (
    <>
      <Box
        aria-describedby={id}
        onClick={handleClick}
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
          {films.map((film) => (
            <ListItem key={film.id}>
              <ListItemAvatar>
                <Avatar>
                  <Google/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={film.title} secondary={film.releaseDate}/>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default SearchPopover;

