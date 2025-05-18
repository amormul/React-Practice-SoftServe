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
import {Dialog, Drawer} from '@mui/material';
import {Favorite, HomeFilled, LocalMovies, Logout, Schedule, Settings, SupervisedUserCircle} from '@mui/icons-material';
import {Link, useLocation} from "react-router-dom";
import AuthForm from "../AuthForm.tsx";

const pages = [
  {name: 'Головна', icon: <HomeFilled/>, path: '/'},
  {name: 'Фільми', icon: <LocalMovies/>, path: '/movies'},
  {name: 'Сеанси', icon: <Schedule/>, path: '/sessions'},
  {name: 'Обрані', icon: <Favorite/>, path: '/favorites'}
];

const settings = [
  {name: 'Мій профіль', icon: <SupervisedUserCircle/>, path: '/profile'},
  {name: 'Мої квитки', icon: <LocalMovies/>, path: '/tickets'},
  {name: 'Налаштування', icon: <Settings/>, path: '/settings'},
  {name: 'Вийти', icon: <Logout/>, path: '/logout'}
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const isLoggedIn = false;

  const isActive = (path: string) => location.pathname === path;

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

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
    <AppBar sx={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
      <Container maxWidth="lg" sx={{paddingX: {xs: 1, sm: '16px'}}}>
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box sx={{display: {xs: 'none', md: 'flex'}, backgroundColor: '#FF0000', borderRadius: 2}}>
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
            <Box sx={{backgroundColor: '#FF0000', borderRadius: 2, display: 'flex'}}>
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
          {isLoggedIn ? (
            <Button
              aria-controls="menu-profile"
              sx={{
                backgroundColor: anchorElUser ? '#2e2e2e' : undefined,
                borderBottom: anchorElUser ? '2px solid #FF0000' : undefined,
                '&:hover': {backgroundColor: '#2e2e2e'},
              }}
              onClick={handleOpenUserMenu}
            >
              <Avatar alt="Username" src="/static/images/avatar/2.jpg"/>
              <Typography sx={{ml: 1, display: {xs: 'none', sm: 'block'}}}>
                Username
              </Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginOpen}
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
          </Menu>
        </Toolbar>
      </Container>

      {/* Login Dialog */}
      <Dialog
        open={isLoginOpen}
        onClose={handleLoginClose}
        maxWidth="xs"
        slotProps={{
          paper: {sx: {margin: 1}}
        }}
      >
        <AuthForm/>
      </Dialog>
    </AppBar>
  );
}

export default ResponsiveAppBar;
