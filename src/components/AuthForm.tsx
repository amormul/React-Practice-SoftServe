import React, { useState, ChangeEvent, FormEvent } from "react";
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


type AuthMode = "login" | "register";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const AuthForm: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>("login");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        setFormData({ name: "", email: "", password: "" });
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4 }}>
            <Tabs value={mode} onChange={handleTabChange} centered sx={{
                "& .MuiTabs-indicator": { backgroundColor: "#FF0000" },
            }}>
                <Tab label="Вхід" value="login"  sx={{
                    color: "#000",
                    "&.Mui-selected": {
                        color: "#FF0000",
                    },
                }}/>
                <Tab label="Регістрація" value="register" sx={{
                    color: "#000", // default text color
                    "&.Mui-selected": {
                        color: "#FF0000", // color of selected tab text
                    },
                }} />
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
                    {mode === "login" ? "Увійти" : "Зареєструватися"}
                </Button>
                <FormControlLabel
                    control={<Checkbox defaultChecked
                                       sx={{
                                           color:"#FF0000",
                                           '&.Mui-checked': {
                                               color: "FF0000",
                                           },
                                       }}/>}
                    label="Запам'ятати мене"
                />
            </Box>
        </Paper>
    );
};

export default AuthForm;