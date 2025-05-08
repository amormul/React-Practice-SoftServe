export const baseNavLinkStyles = {
    textDecoration: "none",
    color: "#fff",
    fontFamily: "sans-serif",
    fontSize: "14px",
    "&:hover": {
        color: "#dc5335",
    },
};

export const baseButtonStyles = {
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "sans-serif",
    transition: "all 0.3s ease",
};

export const loginStyles = {
    ...baseButtonStyles,
    color: "#fff",
    border: "1px solid #fff",
    backgroundColor: "transparent",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        textDecoration: "none",
        color: "#dc5335",
    },
};

export const signupStyles = {
    ...baseButtonStyles,
    color: "#fff",
    backgroundColor: "#ff0000",
    border: "1px solid #ff0000",
    "&:hover": {
        backgroundColor: "#cc0000",
        textDecoration: "none",
        color: "#000000",
    },
};