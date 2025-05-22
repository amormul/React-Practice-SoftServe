import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Container,
    Avatar, Button, MenuItem, Menu, Drawer
} from '@mui/material';
import {
    Favorite, HomeFilled, LocalMovies, Logout, Schedule, Settings, SupervisedUserCircle
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import SearchPopover from "./SearchPopover.tsx";
import SearchDrawer from "./SearchDrawer.tsx";
import {useAuth} from "../../context/AuthProvider"

const pages = [
    {name: 'Головна', icon: <HomeFilled/>, path: '/'},
    {name: 'Фільми', icon: <LocalMovies/>, path: '/movies'},
    {name: 'Сеанси', icon: <Schedule/>, path: '/buy_tickets'},
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
    const location = useLocation();
    const navigate = useNavigate();
    const {user, logout, isAuthenticated} = useAuth();

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

    const handleLoginClick = () => {
        const back = encodeURIComponent(location.pathname + location.search);
        navigate(`/login?back=${back}`);
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
                                sx={{width: 300, padding: 2}}
                                role="presentation"
                                onClick={handleCloseNavMenu}
                                onKeyDown={handleCloseNavMenu}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} sx={{borderRadius: 2, padding: 2}} component={Link}
                                              to={page.path}>
                                        {page.icon}
                                        <Typography sx={{textAlign: 'center', ml: 1}}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Box>
                        </Drawer>
                    </Box>

                    {/* Mobile Logo */}
                    <Box sx={{flexGrow: {xs: 1, sm: 0}, display: {xs: 'flex', md: 'none'}}}>
                        <Box sx={{backgroundColor: '#FF0000', borderRadius: 2, display: 'flex'}} component={Link}
                             to="/">
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

                    {/* Profile or Login */}
                    {isAuthenticated ? (
                        <>
                            <Button
                                size="large"
                                aria-controls="menu-profile"
                                onClick={handleOpenUserMenu}
                                sx={{
                                    backgroundColor: anchorElUser ? '#2e2e2e' : undefined,
                                    borderBottom: anchorElUser ? '2px solid #FF0000' : undefined,
                                    '&:hover': {backgroundColor: '#2e2e2e'},
                                    ml: 2
                                }}
                            >
                                <Avatar alt={user?.name}/>
                                <Typography color="secondary" sx={{ml: 1, display: {xs: 'none', sm: 'block'}}}>
                                    {user?.name}
                                </Typography>
                            </Button>

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
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                        handleCloseUserMenu();
                                    }}
                                    sx={{backgroundColor: "#ffdddd"}}
                                >
                                    <Logout/>
                                    <Typography ml={1}>Вийти</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{ml: 2}}>
                            Увійти
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
