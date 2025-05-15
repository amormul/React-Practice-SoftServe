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
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Left Logo Desktop */}
          <Box
            sx={{
              display: {xs: 'none', md: 'flex'},
              backgroundColor: '#FF0000',
              borderRadius: 2
            }}
          >
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
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
            flexGrow: 1,
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
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              flexGrow: {xs: 0, sm: 1},
              display: 'flex',
              alignItems: 'center',
              // backgroundColor: "white",
              borderRadius: 5,
              px: {xs: 0, sm: 1},
              mx: 2,
            }}
          >
            <SearchIcon sx={{color: "black"}}/>
            <InputBase
              placeholder="Пошук…"
              sx={{
                display: {xs: 'none', sm: 'flex'},
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
              '&:hover': {
                backgroundColor: '#FF0000', // Hover effect
              },
              '&:active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Active effect
              },
              p: '5px', // Optional padding for better spacing
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
              // sx={{mt: '50px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
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
