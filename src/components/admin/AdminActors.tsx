import { useState, useEffect, ChangeEvent, MouseEvent, FunctionComponent } from "react";
import { Api } from "../api/config"; // Припускаємо, що цей шлях правильний
// import AvatarUploader from "../AvatarUploader.tsx"; // Ваш кастомний компонент

interface AvatarUploaderProps {
    onConfirm: (file: File) => void;
    label?: string;
}
const AvatarUploader: FunctionComponent<AvatarUploaderProps> = ({ onConfirm, label = "Обрати фото" }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onConfirm(event.target.files[0]);
        }
    };
    return (
        <Button component="label" variant="outlined" size="small">
            {label}
            <input type="file" hidden accept="image/*" onChange={handleChange} />
        </Button>
    );
};

import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    IconButton,
    Collapse,
    Alert,
    CircularProgress,
    Grid,
    AlertTitle,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon, Add as AddIcon } from "@mui/icons-material";

interface Actor {
    id: number;
    name: string;
    birthday: string;
}

export default function AdminActors() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [name, setName] = useState<string>("");
    const [birthday, setBirthday] = useState<string>(""); // YYYY-MM-DD
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Edit mode states
    const [editingActorId, setEditingActorId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [editBirthday, setEditBirthday] = useState<string>(""); // YYYY-MM-DD
    const [editImage, setEditImage] = useState<File | null>(null);

    useEffect(() => {
        fetchActors();
    }, []);

    const fetchActors = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(Api.ACTORS_ADMIN);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: "Не вдалося завантажити акторів. Статус: " + res.status }));
                throw new Error(errorData.message || "Не вдалося завантажити акторів");
            }
            const data = await res.json();
            setActors(data || []);
        } catch (err: any) {
            setError(err.message);
            setActors([]);
        } finally {
            setLoading(false);
        }
    };

    const getActorImageUrl = (id: number, timestamp?: boolean): string => {
        // Додаємо timestamp, щоб уникнути кешування старого зображення після оновлення
        return `${Api.IMAGES_ACTORS}/${id}${timestamp ? `?t=${new Date().getTime()}` : ''}`;
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setBirthday(e.target.value); // Input type="date" повертає YYYY-MM-DD
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!selectedImage) {
            setError("Будь ласка, виберіть зображення");
            return;
        }
        if (!name.trim() || !birthday) {
            setError("Ім'я та дата народження є обов'язковими");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("birthday", birthday);
            formData.append("image", selectedImage);

            const response = await fetch(Api.ACTORS_ADMIN, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Помилка при додаванні режисера" }));
                throw new Error(errorData.error || "Помилка при додаванні режисера");
            }

            setSelectedImage(null);
            document.getElementById('avatar-uploader-add-form')?.setAttribute('value', '');


            setSuccess("Режисер успішно доданий");
            await fetch(Api.ACTORS_ADMIN, {});
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const startEditing = (actor: Actor) => {
        setEditingActorId(actor.id);
        setEditName(actor.name);
        // API повертає дату, яку потрібно форматувати для input type="date"
        setEditBirthday(new Date(actor.birthday).toISOString().split('T')[0]);
        setEditImage(null);
        setError(null);
        setSuccess(null);
    };

    const cancelEditing = () => {
        setEditingActorId(null);
        setEditName("");
        setEditBirthday("");
        setEditImage(null);
    };

    const saveActor = async () => {
        if (!editingActorId) return;
        setError(null);
        setSuccess(null);

        if (!editName.trim() || !editBirthday) {
            setError("Ім'я та дата народження є обов'язковими для редагування");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", editName);
            formData.append("birthday", editBirthday);
            if (editImage) {
                formData.append("image", editImage);
            }
            formData.append("PUT", true); // Частий спосіб вказати PUT для FormData

            const response = await fetch(`${Api.ACTORS_ADMIN}/${editingActorId}`, {
                method: "POST", // HTML форми не підтримують PUT напряму для FormData, часто використовують POST + _method
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Помилка при оновленні режисера" }));
                throw new Error(errorData.error || "Помилка при оновленні режисера");
            }

            setSuccess("Режисер успішно оновлений");
            cancelEditing();
            await fetchActors(); // Перезавантажити з оновленим зображенням
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const deleteActor = async (id: number) => {
        if (!window.confirm("Ви впевнені, що хочете видалити цього режисера?")) {
            return;
        }
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${Api.ACTORS_ADMIN}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Не вдалося видалити режисера" }));
                throw new Error(errorData.error || "Не вдалося видалити режисера");
            }

            setSuccess("Режисер успішно видалений");
            await fetchActors();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Управління акторами
            </Typography>

            <Collapse in={!!error}>
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
                    <AlertTitle>Помилка</AlertTitle>
                    {error}
                </Alert>
            </Collapse>

            <Collapse in={!!success}>
                <Alert severity="success" onClose={() => setSuccess(null)} sx={{ mb: 2 }}>
                    <AlertTitle>Успіх</AlertTitle>
                    {success}
                </Alert>
            </Collapse>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Додати нового актора
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Ім'я"
                            value={name}
                            onChange={handleNameChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Дата народження"
                            type="date"
                            value={birthday}
                            onChange={handleBirthdayChange}
                            required
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mb: 1 }}>Фото:</Typography>
                        <AvatarUploader
                            onConfirm={(imageFile) => setSelectedImage(imageFile)}
                            label={selectedImage ? `Файл: ${selectedImage.name.substring(0,20)}...` : "Обрати фото"}
                        />
                        {selectedImage && (
                            <Avatar
                                src={URL.createObjectURL(selectedImage)}
                                sx={{ width: 100, height: 100, mt: 1 }}
                                variant="rounded"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleSubmit}
                            disabled={!name.trim() || !birthday || !selectedImage}
                        >
                            Додати актора
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h6" component="h2" gutterBottom sx={{mt: 4}}>
                Список акторів
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                    <CircularProgress />
                </Box>
            ) : !actors.length && !error ? (
                <Alert severity="info" sx={{mt: 2}}>Немає доданих акторів</Alert>
            ) : (
                <TableContainer component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'grey.200' }}>
                                <TableCell>Фото</TableCell>
                                <TableCell>Ім'я</TableCell>
                                <TableCell>Дата народження</TableCell>
                                <TableCell align="right">Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {actors.map((actor) => (
                                editingActorId === actor.id ? (
                                    // Режим редагування
                                    <TableRow key={actor.id} sx={{ '& > *': { verticalAlign: 'top' } }}>
                                        <TableCell component="th" scope="row">
                                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                                                <Avatar
                                                    src={editImage ? URL.createObjectURL(editImage) : getActorImageUrl(actor.id, true)} // Додаємо timestamp
                                                    alt={editName}
                                                    sx={{ width: 60, height: 60, mb: 1 }}
                                                    variant="rounded"
                                                />
                                                <AvatarUploader
                                                    onConfirm={(image) => setEditImage(image)}
                                                    label={editImage ? `Нове: ${editImage.name.substring(0,10)}...` : "Змінити фото"}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                label="Ім'я"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                label="Дата народження"
                                                type="date"
                                                value={editBirthday} // Має бути YYYY-MM-DD
                                                onChange={(e) => setEditBirthday(e.target.value)}
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<SaveIcon />}
                                                    onClick={saveActor}
                                                    disabled={!editName.trim() || !editBirthday}
                                                >
                                                    Зберегти
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    startIcon={<CancelIcon />}
                                                    onClick={cancelEditing}
                                                >
                                                    Скасувати
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    // Режим перегляду
                                    <TableRow
                                        key={actor.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Avatar
                                                src={getActorImageUrl(actor.id)}
                                                alt={actor.name}
                                                sx={{ width: 60, height: 60 }}
                                                variant="rounded"
                                            />
                                        </TableCell>
                                        <TableCell>{actor.name}</TableCell>
                                        <TableCell>
                                            {new Date(actor.birthday).toLocaleDateString('uk-UA', {
                                                day: '2-digit', month: '2-digit', year: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => startEditing(actor)}
                                                    disabled={editingActorId !== null}
                                                    size="small"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => deleteActor(actor.id)}
                                                    disabled={editingActorId !== null}
                                                    size="small"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}