import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Box, Tabs, Tab, TextField, Paper, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Api } from "./api/config.ts";
import { useAuth } from "../context/AuthProvider"

type AuthMode = "login" | "register";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const AuthForm: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>("login");
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", password: "" });
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const backRoute = queryParams.get("back") || "/";
    
    // Check if already authenticated and redirect if needed
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log("User is already authenticated, redirecting to:", backRoute);
            navigate(backRoute, { replace: true });
        }
    }, [isAuthenticated, user, navigate, backRoute]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const url = mode === "login" ? Api.LOGIN : Api.REGISTER;

        try {
            console.log("Submitting auth form to:", url);
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Auth response:", data);

            if (response.ok && data.success && data.token) {
                console.log("Login successful, setting token and redirecting to:", backRoute);
                login(data.token);
                // Use replace: true to prevent back button from returning to login
                navigate(backRoute, { replace: true });
            } else {
                alert(data.message || "Помилка входу");
            }
        } catch (error) {
            console.error("Помилка при запиті:", error);
            alert("Помилка з'єднання з сервером");
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: AuthMode) => {
        setMode(newValue);
        setFormData({ name: "", email: "", password: "" });
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4 }}>
            <Tabs value={mode} onChange={handleTabChange} centered>
                <Tab label="Вхід" value="login" />
                <Tab label="Реєстрація" value="register" />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} mt={2}>
                {mode === "register" && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Ім'я"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                    {mode === "login" ? "Увійти" : "Зареєструватися"}
                </Button>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Запам'ятати мене"
                    sx={{ mt: 1 }}
                />
            </Box>
        </Paper>
    );
};

export default AuthForm;
