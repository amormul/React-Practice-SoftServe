import React, {ChangeEvent, FormEvent, useState} from "react";
import {Box, Button, Paper, Tab, Tabs, TextField} from "@mui/material";

interface FormData {
  name: string;
  email: string;
  password: string;
}

type AuthMode = "login" | "register";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      console.log("Logging in with", formData);
    } else {
      console.log("Registering with", formData);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: AuthMode) => {
    setMode(newValue);
    console.log(event);
    setFormData({name: "", email: "", password: ""});
  };

  return (
    <Paper>
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
            color: "#FF0000", // color of selected tab text
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
    </Paper>
  );
};

export default AuthForm;