import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import SearchBar from './SearchBar';

const genres = ['Бойовик', 'Комедія', 'Драма'];
const countries = ['Україна', 'США', 'Франція'];
const years = ['2023', '2022', '2021'];
const audios = ['Українська', 'Англійська'];

const MovieFilter: React.FC = () => {
    const [genre, setGenre] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [year, setYear] = React.useState('');
    const [audio, setAudio] = React.useState('');

    return (
        <Box sx={{ backgroundColor: '#1c2b35', p: 2, borderRadius: 2, color: 'white' }}>
            <Typography variant="h5" gutterBottom>
                Підібрати фільм на свій смак
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Жанр</InputLabel>
                    <Select value={genre} onChange={(e) => setGenre(e.target.value)} sx={{ color: 'white' }}>
                        {genres.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Країна</InputLabel>
                    <Select value={country} onChange={(e) => setCountry(e.target.value)} sx={{ color: 'white' }}>
                        {countries.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Рік</InputLabel>
                    <Select value={year} onChange={(e) => setYear(e.target.value)} sx={{ color: 'white' }}>
                        {years.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Аудіо</InputLabel>
                    <Select value={audio} onChange={(e) => setAudio(e.target.value)} sx={{ color: 'white' }}>
                        {audios.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                    </Select>
                </FormControl>

                <SearchBar/>
            </Box>
        </Box>
    );
};

export default MovieFilter;
