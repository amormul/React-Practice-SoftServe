"use client"

import React, { useEffect, useState } from "react"
import { Api } from "../api/config"
import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material"
import dayjs from 'dayjs'

type Session = {
    id: number
    movie_id: number
    hall_id: number
    time: string // ISO datetime string
}

type Movie = {
    id: number
    title: string
}

export default function AdminSessions() {
    const [sessions, setSessions] = useState<Session[]>([])
    const [movies, setMovies] = useState<Movie[]>([])
    const [halls, setHalls] = useState<number[]>([])

    const [selectedSessionIndex, setSelectedSessionIndex] = useState<number | null>(null)

    const [movieId, setMovieId] = useState<number | "">("")
    const [hallId, setHallId] = useState<number | "">("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const [sessionsRes, moviesRes, hallsRes] = await Promise.all([
            fetch(Api.SESSIONS_ADMIN).then(r => r.json()),
            fetch(Api.MOVIES_ADMIN_SHORT).then(r => r.json()),
            fetch(Api.HALLS_ADMIN_SHORT).then(r => r.json()),
        ])
        setSessions(sessionsRes)
        setMovies(moviesRes)
        setHalls(hallsRes)
    }

    const handleSelectSession = (index: number) => {
        const session = sessions[index]
        const dt = dayjs(session.time)
        setSelectedSessionIndex(index)
        setMovieId(session.movie_id)
        setHallId(session.hall_id)
        setDate(dt.format("YYYY-MM-DD"))
        setTime(dt.format("HH:mm"))
    }

    const handleClear = () => {
        setSelectedSessionIndex(null)
        setMovieId("")
        setHallId("")
        setDate("")
        setTime("")
    }

    const handleSave = async () => {
        if (!movieId || !hallId || !date || !time) return alert("Заповніть всі поля")

        const isoTime = `${date}T${time}`

        if (selectedSessionIndex !== null) {
            const session = sessions[selectedSessionIndex]
            const updated = {
                ...session,
                movie_id: movieId,
                hall_id: hallId,
                time: isoTime,
            }
            await fetch(`${Api.SESSIONS_ADMIN}/${session.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            })
        } else {
            const newSession = {
                movie_id: movieId,
                hall_id: hallId,
                time: isoTime,
            }
            await fetch(Api.SESSIONS_ADMIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSession),
            })
        }
        await fetchData()
        handleClear()
    }

    const handleDelete = async () => {
        if (selectedSessionIndex === null) return
        const session = sessions[selectedSessionIndex]
        await fetch(`${Api.SESSIONS_ADMIN}/${session.id}`, {
            method: "DELETE",
        })
        await fetchData()
        handleClear()
    }

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5">Керування сеансами</Typography>

            {/* Список сеансів */}
            <Box>
                <Typography variant="subtitle1">Список сеансів</Typography>
                {sessions.map((s, i) => {
                    const movie = movies.find(m => m.id === s.movie_id)?.title || `#${s.movie_id}`
                    const hallName = `Зала ${s.hall_id}`
                    const dt = dayjs(s.time).format("YYYY-MM-DD HH:mm")
                    return (
                        <Box
                            key={s.id}
                            p={1}
                            border="1px solid #ccc"
                            borderRadius={1}
                            mt={1}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                🎬 <strong>{movie}</strong> — 🏛 {hallName} — 🕒 {dt}
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleSelectSession(i)}
                            >
                                Редагувати
                            </Button>
                        </Box>
                    )
                })}
            </Box>

            {/* Форма */}
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1">
                    {selectedSessionIndex !== null ? "Редагування сеансу" : "Новий сеанс"}
                </Typography>

                <Select
                    fullWidth
                    value={movieId}
                    onChange={(e: SelectChangeEvent<number>) => setMovieId(Number(e.target.value))}
                    displayEmpty
                >
                    <MenuItem value="">Оберіть фільм</MenuItem>
                    {movies.map(m => (
                        <MenuItem key={m.id} value={m.id}>
                            {m.title}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    fullWidth
                    value={hallId}
                    onChange={(e: SelectChangeEvent<number>) => setHallId(Number(e.target.value))}
                    displayEmpty
                >
                    <MenuItem value="">Оберіть зал</MenuItem>
                    {halls.map(h => (
                        <MenuItem key={h} value={h}>
                            Зала {h}
                        </MenuItem>
                    ))}
                </Select>

                <Box display="flex" gap={2}>
                    <TextField
                        type="date"
                        label="Дата"
                        fullWidth
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        type="time"
                        label="Час"
                        fullWidth
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Box display="flex" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        {selectedSessionIndex !== null ? "Зберегти зміни" : "Створити сеанс"}
                    </Button>
                    {selectedSessionIndex !== null && (
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            Видалити
                        </Button>
                    )}
                    <Button onClick={handleClear}>Скасувати</Button>
                </Box>
            </Box>
        </Box>
    )
}
