import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Alert, Box, Button, Dialog, Tab, Tabs, TextField} from "@mui/material";
import {UserContext} from "../context/AuthProvider";
import {useSnackbar} from "../context/SnackbarProvider.tsx";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "register";

const AuthDialog: React.FC<AuthDialogProps> = ({open, onClose}) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<FormData>({name: "", email: "", password: ""});
  const [error, setError] = useState<string | null>(null);
  const {login, register} = useContext(UserContext);
  const {showSnackbar} = useSnackbar();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
        showSnackbar("Ви успішно увійшли!", "success");

      } else if (mode === "register") {
        await register(formData.name, formData.email, formData.password);
        showSnackbar("Реєстрація пройшла успішно!", "success");
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: AuthMode) => {
    setMode(newValue);
    setFormData({name: "", email: "", password: ""});
    setError(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      slotProps={{
        paper: {sx: {margin: 1}}
      }}
    >
      <Tabs value={mode} onChange={handleTabChange} centered sx={{
        "& .MuiTabs-indicator": {backgroundColor: "#FF0000"},
      }}>
        <Tab label="Вхід" value="login" sx={{
          "&.Mui-selected": {
            color: "#FF0000",
          },
        }}/>
        <Tab label="Регістрація" value="register" sx={{
          "&.Mui-selected": {
            color: "#FF0000",
          },
        }}/>
      </Tabs>

      <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", gap: 2, padding: 2}}>
        {mode === "register" && (
          <TextField
            margin="normal"
            label="Ім'я"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              },
            }}
          />
        )}
        {error && <Alert variant="filled" severity="error">{error}</Alert>}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          margin="normal"
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          className="auth_form_button"
        >
          {mode === "login" ? "Увійти" : "Зареєструватися"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AuthDialog;