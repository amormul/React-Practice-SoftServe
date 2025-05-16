import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const pages = ['Головна', 'Фільми', 'Сеанси', 'Обрані'];
const settings = ['Мій профіль', 'Мої квитки', 'Налаштування', 'Вийти'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg" sx={{paddingX: {xs: 0, sm: '16px'}}}>
        <Toolbar disableGutters>
          {/* Left Logo Desktop */}
          <Box sx={{display: {xs: 'none', md: 'flex'}, backgroundColor: '#FF0000', borderRadius: 2}}>
            <img src="/logo.svg" alt="Logo" style={{height: '50px'}}/>
          </Box>

          {/* Mobile Appbar */}
          <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'none'}, paddingRight: 1}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
              transformOrigin={{vertical: 'top', horizontal: 'left'}}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo Mobile  */}
          <Box sx={{
            flexGrow: {xs: 1, sm: 0},
            display: {xs: 'flex', md: 'none'}
          }}
          >
            <Box sx={{
              backgroundColor: '#FF0000',
              borderRadius: 2,
              display: 'flex'
            }}>
              <img src="/logo.svg" alt="Logo" style={{height: '40px', display: 'block'}}/>
            </Box>
          </Box>

          {/* Navigation Desktop */}
          <Box sx={{
            flexGrow: 1,
            display: {xs: 'none', md: 'flex'},
            paddingRight: 5,
            paddingLeft: 2
          }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{my: 2, display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Mobile Search Icon */}
          <IconButton aria-label="search" sx={{display: {xs: 'flex', sm: 'none'}}}>
            <SearchIcon/>
          </IconButton>

          {/* Desktop Search Bar */}
          <Box
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
              sx={{
                ml: 1,
                flex: 1,
                color: "black"
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </Box>

          {/* Profile */}
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: 2,
              backgroundColor: anchorElUser ? '#2e2e2e' : undefined,
              borderBottom: anchorElUser ? '2px solid #FF0000' : undefined,
              '&:hover': {backgroundColor: '#2e2e2e'},
              p: '6px',
            }}
          >
            <IconButton sx={{p: 0}}>
              <Avatar sx={{bgcolor: '#FF0000'}} alt="Uemy Sharp" src="/static/images/avatar/2.jpg"/>
            </IconButton>
            <Typography sx={{
              ml: 1,
              fontWeight: 500,
              display: {xs: 'none', sm: 'block'},
            }}
            >
              Username
            </Typography>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
