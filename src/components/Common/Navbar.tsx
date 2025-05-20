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
import SearchPopover from "./SearchPopover.tsx";
import SearchDrawer from "./SearchDrawer.tsx";
import {Drawer} from '@mui/material';
import {Favorite, HomeFilled, LocalMovies, Logout, Schedule, Settings, SupervisedUserCircle} from '@mui/icons-material';
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../context/AuthProvider.tsx";
import {useAuthDialog} from "../../context/AuthDialogContext.tsx";

const pages = [
  {name: 'Головна', icon: <HomeFilled/>, path: '/'},
  {name: 'Фільми', icon: <LocalMovies/>, path: '/movies'},
  {name: 'Сеанси', icon: <Schedule/>, path: '/sessions'},
];

const settings = [
  {name: 'Мій профіль', icon: <SupervisedUserCircle/>, path: '/profile'},
  {name: 'Мої квитки', icon: <LocalMovies/>, path: '/tickets'},
  {name: 'Обрані', icon: <Favorite/>, path: '/favorites'},
  {name: 'Налаштування', icon: <Settings/>, path: '/settings'}
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const {user, isLoggedIn, logout} = useContext(UserContext);
  const { openAuthDialog } = useAuthDialog();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
    <AppBar sx={{backgroundColor: 'rgba(0,0,0,0.65)'}}>
      <Container maxWidth="lg" sx={{paddingX: {xs: 1, sm: '16px'}}}>
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box
            sx={{display: {xs: 'none', md: 'flex'}, backgroundColor: '#FF0000', borderRadius: 2}}
            component={Link}
            to="/"
          >
            <img src="/logo.svg" alt="Logo" style={{height: '50px'}}/>
          </Box>

          {/* Mobile Appbar */}
          <Box sx={{display: {xs: 'flex', md: 'none'}, paddingRight: 1}}>
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
            <Drawer
              anchor="left"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            >
              <Box
                sx={{
                  width: 300,
                  padding: 2,
                }}
                role="presentation"
                onClick={handleCloseNavMenu}
                onKeyDown={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} sx={{borderRadius: 2, padding: 2}} component={Link} to={page.path}>
                    {page.icon}
                    <Typography sx={{textAlign: 'center', ml: 1}}>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{flexGrow: {xs: 1, sm: 0}, display: {xs: 'flex', md: 'none'}}}>
            <Box sx={{backgroundColor: '#FF0000', borderRadius: 2, display: 'flex'}} component={Link} to="/">
              <img src="/logo.svg" alt="Logo" style={{height: '40px', display: 'block'}}/>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{display: {xs: 'none', md: 'flex'}, paddingX: 2}}>
            {pages.map((page) => (
              <Button
                component={Link}
                key={page.name}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  m: 1,
                  borderBottom: isActive(page.path) ? '2px solid #FF0000' : 'none',
                  color: isActive(page.path) ? '#FF0000' : 'inherit',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Mobile Search Icon */}
          <SearchDrawer/>

          {/* Desktop Search Bar */}
          <SearchPopover/>

          {/* Profile or Login/Registration */}
          {isLoggedIn() ? (
            <Button
              size="large"
              aria-controls="menu-profile"
              sx={{
                backgroundColor: anchorElUser ? '#2e2e2e' : undefined,
                borderBottom: anchorElUser ? '2px solid #FF0000' : undefined,
                '&:hover': {backgroundColor: '#2e2e2e'},
              }}
              onClick={handleOpenUserMenu}
            >
              <Avatar alt={user?.username} src={user?.avatarUrl}/>
              <Typography color="secondary" sx={{ml: 1, display: {xs: 'none', sm: 'block'}}}>
                {user?.username}
              </Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={openAuthDialog}
            >
              Увійти
            </Button>
          )}
          <Menu
            id="menu-profile"
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
          >
            {settings.map((setting) => (
              <MenuItem
                onClick={handleCloseUserMenu}
                component={Link}
                key={setting.name}
                to={setting.path}
              >
                {setting.icon}
                <Typography ml={1}>{setting.name}</Typography>
              </MenuItem>
            ))}
            {/* Logout */}
            <MenuItem
              onClick={() => { logout(); handleCloseUserMenu(); }}
              sx={{
                backgroundColor: "red"
              }}
            >
              <Logout />
              <Typography ml={1}>Вийти</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
