import React, { createContext, useContext, useState, ReactNode } from "react";
import AuthDialog from "../components/AuthDialog.tsx";

interface AuthDialogContextProps {
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextProps | undefined>(undefined);

export const AuthDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  const openAuthDialog = () => setAuthDialogOpen(true);
  const closeAuthDialog = () => setAuthDialogOpen(false);

  return (
    <AuthDialogContext.Provider value={{ isAuthDialogOpen, openAuthDialog, closeAuthDialog }}>
      {children}
      <AuthDialog open={isAuthDialogOpen} onClose={closeAuthDialog} />
    </AuthDialogContext.Provider>
  );
};

export const useAuthDialog = (): AuthDialogContextProps => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog must be used within an AuthDialogProvider");
  }
  return context;
};