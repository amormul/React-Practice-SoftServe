import React, { useState, useEffect, ChangeEvent } from 'react';
import { Api } from '../api/config';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
    Chip,
    OutlinedInput,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Avatar,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface Actor {
    id: number;
    name: string;
    birthday: string;
}

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id?: number;
    title: string;
    description: string;
    director_id: number;
    duration: number;
    rating: number;
    year: number;
    genres: number[];
    actors: { id: number; char_name: string }[];
    image?: File | null;
}

interface MovieListItem {
    id: number;
    title: string;
    description: string;
    duration: number;
    rating: number;
    year: number;
    director: { id: number; name: string } | null;
    genres: { id: number; name: string }[];
    actors: { id: number; name: string; char_name: string }[];
}

const Input = styled('input')({
    display: 'none',
});

export default function AdminMovies(){
    const [movie, setMovie] = useState<Movie>({
        title: '',
        description: '',
        director_id: 0,
        duration: 0,
        rating: 0,
        year: new Date().getFullYear(),
        genres: [],
        actors: [],
        image: null,
    });

    const [genres, setGenres] = useState<Genre[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);
    const [movies, setMovies] = useState<MovieListItem[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const getMovieImageUrl = (id: number, timestamp?: boolean): string => {
        // Додаємо timestamp, щоб уникнути кешування старого зображення після оновлення
        return `${Api.IMAGES_MOVIES}/${id}${timestamp ? `?t=${new Date().getTime()}` : ''}`;
    };

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([fetchGenres(), fetchActors(), fetchMovies()]);
        } catch (e) {
            setError('Не вдалося завантажити дані');
        }
        setLoading(false);
    };

    const fetchGenres = async () => {
        const res = await fetch(Api.GENRES_ADMIN);
        if (!res.ok) throw new Error('Failed to fetch genres');
        const data = await res.json();
        setGenres(data);
    };

    const fetchActors = async () => {
        const res = await fetch(Api.ACTORS_ADMIN);
        if (!res.ok) throw new Error('Failed to fetch actors');
        const data = await res.json();
        setActors(data);
    };

    const fetchMovies = async () => {
        const res = await fetch(Api.MOVIES_ADMIN);

        if (!res.ok) throw new Error('Failed to fetch movies');
        const data = await res.json();
        console.log(data)
        setMovies(data);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMovie(prev => ({
            ...prev,
            [name]: ['duration', 'rating', 'year'].includes(name) ? +value : value,
        }));
    };

    const handleSelectChange = (e: any, key: 'genres') => {
        setMovie(prev => ({ ...prev, [key]: e.target.value }));
    };

    const handleDirectorChange = (e: any) => {
        setMovie(prev => ({ ...prev, director_id: +e.target.value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMovie(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleAddActor = () => {
        setMovie(prev => ({
            ...prev,
            actors: [...prev.actors, { id: 0, char_name: '' }],
        }));
    };

    const handleActorChange = (index: number, field: 'id' | 'char_name', value: any) => {
        const updatedActors = [...movie.actors];
        updatedActors[index][field] = field === 'id' ? +value : value;
        setMovie(prev => ({ ...prev, actors: updatedActors }));
    };

    const handleRemoveActor = (index: number) => {
        const updatedActors = movie.actors.filter((_, i) => i !== index);
        setMovie(prev => ({ ...prev, actors: updatedActors }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            Object.entries(movie).forEach(([key, value]) => {
                if (key === 'actors') {
                    formData.append('actors', JSON.stringify(value));
                } else if (key === 'genres') {
                    (value as number[]).forEach(v => formData.append('genres[]', String(v)));
                } else if (value !== null) {
                    formData.append(key, value as any);
                }
            });

            const method = movie.id ? 'PUT' : 'POST';
            const url = movie.id ? `${Api.MOVIES_ADMIN}/${movie.id}` : Api.MOVIES_ADMIN;
            if(method === "PUT")
            {
                console.log("added put")
                formData.append("PUT", true);
            }
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error('Помилка при збереженні фільму');

            alert('Фільм збережено');
            await fetchMovies();
            clearForm();
        } catch (err: any) {
            setError(err.message || 'Помилка при збереженні фільму');
        }
        setLoading(false);
    };

    const clearForm = () => {
        setMovie({
            title: '',
            description: '',
            director_id: 0,
            duration: 0,
            rating: 0,
            year: new Date().getFullYear(),
            genres: [],
            actors: [],
            image: null,
        });
    };

    const handleEdit = (movieData: MovieListItem) => {
        setMovie({
            id: movieData.id,
            title: movieData.title,
            description: movieData.description,
            director_id: movieData.director?.id || 0,
            duration: movieData.duration,
            rating: movieData.rating,
            year: movieData.year,
            genres: movieData.genres.map(g => g.id),
            actors: movieData.actors.map(a => ({ id: a.id, char_name: a.char_name })),
            image: null,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (id: number) => {
        setMovieToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!movieToDelete) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${Api.MOVIES_ADMIN}/${movieToDelete}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Помилка при видаленні фільму');
            alert('Фільм видалено');
            await fetchMovies();
        } catch (err: any) {
            setError(err.message || 'Помилка при видаленні фільму');
        }
        setLoading(false);
        setDeleteDialogOpen(false);
        setMovieToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setMovieToDelete(null);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Редактор Фільму
            </Typography>

            {loading && <CircularProgress />}
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ maxWidth: 600, mb: 4 }}>
                <TextField
                    fullWidth
                    label="Назва"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Опис"
                    name="description"
                    value={movie.description}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Тривалість (хв)"
                    name="duration"
                    value={movie.duration}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Рейтинг"
                    name="rating"
                    value={movie.rating}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0, max: 10, step: 0.1 }}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Рік"
                    name="year"
                    value={movie.year}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 1800, max: new Date().getFullYear() }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="director-label">Режисер</InputLabel>
                    <Select
                        labelId="director-label"
                        value={movie.director_id}
                        onChange={handleDirectorChange}
                        label="Режисер"
                    >
                        <MenuItem value={0}>-- оберіть режисера --</MenuItem>
                        {actors.map(d => (
                            <MenuItem key={d.id} value={d.id}>
                                {d.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="genres-label">Жанри</InputLabel>
                    <Select
                        labelId="genres-label"
                        multiple
                        value={movie.genres}
                        onChange={e => handleSelectChange(e, 'genres')}
                        input={<OutlinedInput label="Жанри" />}
                        renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as number[]).map(id => {
                                    const g = genres.find(g => g.id === id);
                                    return <Chip key={id} label={g?.name} />;
                                })}
                            </Box>
                        )}
                    >
                        {genres.map(g => (
                            <MenuItem key={g.id} value={g.id}>
                                {g.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Актори</Typography>
                    {movie.actors.map((actor, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id={`actor-select-${index}`}>Актор</InputLabel>
                                <Select
                                    labelId={`actor-select-${index}`}
                                    value={actor.id}
                                    onChange={e => handleActorChange(index, 'id', e.target.value)}
                                >
                                    <MenuItem value={0}>-- оберіть актора --</MenuItem>
                                    {actors.map(a => (
                                        <MenuItem key={a.id} value={a.id}>
                                            {a.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Роль (персонаж)"
                                value={actor.char_name}
                                onChange={e => handleActorChange(index, 'char_name', e.target.value)}
                            />
                            <Button variant="outlined" color="error" onClick={() => handleRemoveActor(index)}>
                                ×
                            </Button>
                        </Box>
                    ))}
                    <Button onClick={handleAddActor} sx={{ mt: 1 }}>
                        Додати актора
                    </Button>
                </Box>

                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={handleImageUpload} />
                    <Button variant="contained" component="span" sx={{ mt: 2 }}>
                        Завантажити картинку
                    </Button>
                    {movie.image && <Typography sx={{ mt: 1 }}>{movie.image.name}</Typography>}
                </label>

                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        {movie.id ? 'Оновити фільм' : 'Зберегти фільм'}
                    </Button>
                    {movie.id && (
                        <Button
                            variant="outlined"
                            sx={{ ml: 2 }}
                            onClick={clearForm}
                            disabled={loading}
                        >
                            Скасувати редагування
                        </Button>
                    )}
                </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
                Список фільмів
            </Typography>

            {loading && <CircularProgress />}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Постер</TableCell>
                            <TableCell>Назва</TableCell>
                            <TableCell>Режисер</TableCell>
                            <TableCell>Жанри</TableCell>
                            <TableCell>Актори</TableCell>
                            <TableCell>Рік</TableCell>
                            <TableCell>Рейтинг</TableCell>
                            <TableCell>Тривалість</TableCell>
                            <TableCell>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.length ? (
                            movies.map(m => (
                                <TableRow key={m.id}>
                                    <TableCell>
                                        <Avatar variant="rounded" src={getMovieImageUrl(m.id)} sx={{ width: 56, height: 84 }} />
                                    </TableCell>
                                    <TableCell>{m.title}</TableCell>
                                    <TableCell>{m.director?.name || '-'}</TableCell>
                                    <TableCell>
                                        {m.genres.length ? m.genres.map(g => g.name).join(', ') : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {m.actors.length
                                            ? m.actors.map(a => `${a.name} (${a.char_name})`).join(', ')
                                            : '-'}
                                    </TableCell>
                                    <TableCell>{m.year}</TableCell>
                                    <TableCell>{m.rating}</TableCell>
                                    <TableCell>{m.duration} хв</TableCell>
                                    <TableCell>
                                        <Button size="small" onClick={() => handleEdit(m)} disabled={loading}>
                                            Редагувати
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteClick(m.id)}
                                            disabled={loading}
                                            sx={{ ml: 1 }}
                                        >
                                            Видалити
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    Фільми не знайдені
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Діалог підтвердження видалення */}
            <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Підтвердження</DialogTitle>
                <DialogContent>
                    <DialogContentText>Ви дійсно хочете видалити цей фільм?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Скасувати</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Видалити
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
