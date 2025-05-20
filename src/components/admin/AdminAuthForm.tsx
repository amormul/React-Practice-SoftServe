import React, {useState, ChangeEvent, FormEvent} from "react";
import {Api} from "../api/config"
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Paper,
    Button,
    Checkbox,
    FormControlLabel
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
        <Paper elevation={3} sx={{maxWidth: 400, mx: "auto", mt: 8, p: 4}}>
            <Tabs centered sx={{
                "& .MuiTabs-indicator": {backgroundColor: "#FF0000"},
            }}>
                <Tab label="Вхід" value="login" sx={{
                    color: "#000",
                    "&.Mui-selected": {
                        color: "#FF0000",
                    },
                }}/>
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
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            color: '#000',
                            '& fieldset': {
                                borderColor: "none",
                                color: '#fff',
                            },
                            '&:hover fieldset': {
                                borderColor: "none",
                                color: '#fff',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: "none",
                                color: '#fff',
                            },
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
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            color: '#000',
                            '& fieldset': {
                                borderColor: "none",
                                color: '#fff',
                            },
                            '&:hover fieldset': {
                                borderColor: "none",
                                color: '#fff',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: "none",
                                color: '#fff',
                            },
                        },
                    }}
                />
                <Button fullWidth variant="contained" type="submit" className="auth_form_button"
                        sx={{
                            backgroundColor: '#FF0000',
                            border: 'none',
                            transition: '.4s',
                            borderRadius: '15px',
                            '&:hover': {
                                backgroundColor: 'darkred',

                            },
                            '&:focus': {
                                outline: 'none',
                                backgroundColor: 'crimson',
                                border: 'none',
                            },
                            '&:active': {
                                backgroundColor: 'red',
                            }
                        }}>
                    "Увійти"
                </Button>
            </Box>
        </Paper>
    );
};

export default AuthForm;