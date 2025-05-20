import React, { useState } from 'react';
import { Box, Drawer, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Google from '@mui/icons-material/Google'; // Replace with appropriate icon or image

interface Film {
  id: number;
  title: string;
  releaseDate: string;
}

const SearchDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState<Film[]>([
    { id: 1, title: 'Inception', releaseDate: '2010' },
    { id: 2, title: 'Interstellar', releaseDate: '2014' },
    { id: 3, title: 'Dunkirk', releaseDate: '2017' },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Add logic to filter films based on searchQuery
  };

  return (
    <>
      <IconButton
        aria-label="search"
        onClick={handleOpen}
        sx={{display: {xs: 'flex', sm: 'none'}}}
      >
        <SearchIcon />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
          <InputBase
            placeholder="Пошук…"
            value={searchQuery}
            onChange={handleInputChange}
            sx={{
              ml: 2,
              flex: 1
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {films
            .filter((film) => film.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((film) => (
              <ListItem key={film.id}>
                <ListItemAvatar>
                  <Avatar>
                    <Google />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={film.title} secondary={film.releaseDate} />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default SearchDrawer;