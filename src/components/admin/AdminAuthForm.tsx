import React, {useState, ChangeEvent, FormEvent, useEffect} from "react";
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
import {useAuth} from "../../context/AuthProvider";

interface FormData {
    email: string;
    password: string;
}

const AdminAuthForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login, isAuthenticated, user} = useAuth();

    const queryParams = new URLSearchParams(location.search);
    const backRoute = queryParams.get("back") || "/admin";

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    // Check if already authenticated and redirect if needed
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log("Admin user is already authenticated, redirecting to:", backRoute);
            navigate(backRoute, { replace: true });
        }
    }, [isAuthenticated, user, navigate, backRoute]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const url = Api.LOGIN_ADMIN;

        try {
            console.log("Submitting admin auth form to:", url);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Admin auth response:", data);
            
            if (response.ok && data.success && data.token) {
                console.log("Admin login successful, setting token and redirecting to:", backRoute);
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

export default AdminAuthForm;
