import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box, Link as MuiLink } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";

const linkStyles = {
    textDecoration: "none",
    color: "#fff",
    fontFamily: "sans-serif",
    fontSize: "14px",
    "&:hover": {
        textDecoration: "underline",
    },
};

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#000", px: 2, py: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <MuiLink component={RouterLink} to="/" sx={linkStyles}>Home</MuiLink>
                </Box>


                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <MuiLink component={RouterLink} to="/movies" sx={linkStyles}>Movies</MuiLink>
                    <MuiLink component={RouterLink} to="/series" sx={linkStyles}>Series</MuiLink>
                    <MuiLink component={RouterLink} to="/login" sx={linkStyles}>Login/Signup</MuiLink>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

