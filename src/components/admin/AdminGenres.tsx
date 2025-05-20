import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    CircularProgress,
    Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Api } from "../api/config";

type Genre = {
    id: number;
    name: string;
};

export default function AdminGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [newGenre, setNewGenre] = useState("");
    const [editingGenreId, setEditingGenreId] = useState<number | null>(null);
    const [editingGenreName, setEditingGenreName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGenres = async () => {
        try {
            setLoading(true);
            const res = await fetch(Api.GENRES_ADMIN);

            if (!res.ok) throw new Error("Не вдалося завантажити жанри");

            const data = await res.json();
            setGenres(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteGenre = async (id: number) => {
        try {
            setLoading(true);
            const res = await fetch(`${Api.GENRES_ADMIN}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Не вдалося видалити жанр");

            await fetchGenres();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addGenre = async () => {
        if (!newGenre.trim()) return;

        try {
            setLoading(true);
            const res = await fetch(Api.GENRES_ADMIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newGenre }),
            });

            if (!res.ok) throw new Error("Не вдалося додати жанр");

            setNewGenre("");
            await fetchGenres();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (genre: Genre) => {
        setEditingGenreId(genre.id);
        setEditingGenreName(genre.name);
    };

    const cancelEditing = () => {
        setEditingGenreId(null);
        setEditingGenreName("");
    };

    const saveGenre = async () => {
        if (!editingGenreId || !editingGenreName.trim()) return;

        try {
            setLoading(true);
            const res = await fetch(`${Api.GENRES_ADMIN}/${editingGenreId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: editingGenreName }),
            });

            if (!res.ok) throw new Error("Не вдалося оновити жанр");

            cancelEditing();
            await fetchGenres();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") saveGenre();
        else if (e.key === "Escape") cancelEditing();
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Жанри
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    action={
                        <IconButton color="inherit" size="small" onClick={() => setError(null)}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>
            )}

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                    label="Новий жанр"
                    variant="outlined"
                    value={newGenre}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewGenre(e.target.value)}
                    disabled={loading}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={addGenre}
                    disabled={loading || !newGenre.trim()}
                >
                    Додати
                </Button>
            </Stack>

            {loading && !genres.length ? (
                <CircularProgress />
            ) : genres.length > 0 ? (
                <List>
                    {genres.map((genre) => (
                        <ListItem key={genre.id} divider>
                            {editingGenreId === genre.id ? (
                                <>
                                    <TextField
                                        value={editingGenreName}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setEditingGenreName(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        fullWidth
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={saveGenre}
                                            disabled={loading || !editingGenreName.trim()}
                                            color="primary"
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={cancelEditing}
                                            disabled={loading}
                                            color="inherit"
                                        >
                                            <CancelIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </>
                            ) : (
                                <>
                                    <ListItemText
                                        primary={`#${genre.id}: ${genre.name}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => startEditing(genre)}
                                            disabled={loading || editingGenreId !== null}
                                            color="warning"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => deleteGenre(genre.id)}
                                            disabled={loading || editingGenreId !== null}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>Немає доданих жанрів</Typography>
            )}
        </Box>
    );
}
