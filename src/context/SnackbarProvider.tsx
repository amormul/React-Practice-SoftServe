import React, {createContext, useContext, useState, ReactNode} from "react";
import {Snackbar, Alert} from "@mui/material";

interface SnackbarContextProps {
  showSnackbar: (message: string, severity?: "success" | "error" | "warning" | "info") => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [snackbar, setSnackbar] = useState<{message: string; severity: "success" | "error" | "warning" | "info"; open: boolean}>({
    message: "",
    severity: "info",
    open: false,
  });

  const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info" = "info") => {
    setSnackbar({message, severity, open: true});
  };

  const handleClose = () => {
    setSnackbar((prev) => ({...prev, open: false}));
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
        <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};