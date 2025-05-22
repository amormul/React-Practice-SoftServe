import React, { useState, useEffect } from 'react';
import {
    Box, Button, TextField, Typography, Stack
} from '@mui/material';
import {Api} from "../components/api/config.ts"
import {useAuth} from "../context/AuthProvider.tsx";

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(user);
    const {token} = useAuth()

    useEffect(() => {
        fetch(Api.USERS, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setForm(data); // password не приходить з сервера
            });
    }, []);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        fetch( Api.USERS, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(form),
        })
            .then(res => {
                if (!res.ok) throw new Error('Помилка оновлення');
                return res.json();
            })
            .then(data => {
                setUser(data);
                setEditMode(false);
            })
            .catch(err => {
                console.error(err);
                alert('Не вдалося оновити профіль');
            });
    };

    return (
        <Box maxWidth={400} mx="auto" mt={5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Профіль користувача
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Ім’я"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!editMode}
                    fullWidth
                />

                <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!editMode}
                    fullWidth
                />

                <TextField
                    label="Пароль"
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder={editMode ? "Введіть новий пароль" : "••••••••"}
                    disabled={!editMode}
                    fullWidth
                />

                {!editMode ? (
                    <Button variant="outlined" onClick={() => setEditMode(true)}>
                        Редагувати
                    </Button>
                ) : (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleSave}>
                            Зберегти
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                setForm({ ...user, password: '' });
                                setEditMode(false);
                            }}
                        >
                            Скасувати
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

export default ProfilePage;
