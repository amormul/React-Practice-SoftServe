import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box, Link as MuiLink } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";
import { baseNavLinkStyles, loginStyles, signupStyles } from "./HeaderStyles.js";

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#000", px: 2, py: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <IconButton aria-label="Logo">
                        <MuiLink component={RouterLink} to="#" sx={baseNavLinkStyles}>*Logo*</MuiLink>
                    </IconButton>
                    <MuiLink component={RouterLink} to="#" sx={baseNavLinkStyles}>*Name*</MuiLink>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    *Space for search bar*
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 6}}>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MuiLink component={RouterLink} to="#" sx={baseNavLinkStyles}>Home</MuiLink>
                        <MuiLink component={RouterLink} to="#" sx={baseNavLinkStyles}>Anons</MuiLink>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MuiLink component={RouterLink} to="#" sx={loginStyles}>Login</MuiLink>
                        <MuiLink component={RouterLink} to="#" sx={signupStyles}>Signup</MuiLink>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Header;