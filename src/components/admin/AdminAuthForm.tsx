import React, {useState, ChangeEvent, FormEvent} from "react";
import {Api} from "../api/config"
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Paper,
    Button,
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

interface FormData {
    email: string;
    password: string;
}

const AuthForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const backRoute = queryParams.get("back") || "/admin";

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const url = Api.LOGIN_ADMIN;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate(backRoute);
            } else {
                alert(data.message || "Помилка входу");
            }

        } catch (error) {
            console.error("Помилка при запиті:", error);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 8,
                p: 4,
                backgroundColor: "#1e1e1e",
                color: "#fff",
            }}
        >
            <Tabs
                centered
                sx={{
                    "& .MuiTabs-indicator": {backgroundColor: "#FF0000"},
                }}
            >
                <Tab
                    label="Вхід"
                    value="login"
                    sx={{
                        color: "#ccc",
                        "&.Mui-selected": {
                            color: "#FF0000",
                        },
                    }}
                />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputLabelProps={{
                        style: { color: '#bbb' },
                    }}
                    InputProps={{
                        style: {
                            backgroundColor: '#2c2c2c',
                            color: '#fff',
                            borderRadius: '10px',
                        },
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    InputLabelProps={{
                        style: { color: '#bbb' },
                    }}
                    InputProps={{
                        style: {
                            backgroundColor: '#2c2c2c',
                            color: '#fff',
                            borderRadius: '10px',
                        },
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                        mt: 2,
                        backgroundColor: '#FF0000',
                        color: '#fff',
                        borderRadius: '15px',
                        '&:hover': {
                            backgroundColor: 'darkred',
                        },
                        '&:focus': {
                            backgroundColor: 'crimson',
                        },
                        '&:active': {
                            backgroundColor: 'red',
                        },
                    }}
                >
                    Увійти
                </Button>
            </Box>
        </Paper>
    );
};

export default AuthForm;
