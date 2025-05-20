"use client"

import React, { useState, useMemo, useEffect } from "react"
import { SeatUIValues } from "./constants/SeatPickerValues.ts"
import { Api } from "./api/config.ts"
import {
    Box,
    TextField,
    Typography,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Card,
    CardMedia,
    CardContent,
    FormControl,
    InputLabel
} from "@mui/material"

type SeatType = "a" | "b" | "x"
type SeatCell = { type: SeatType; row: number; col: number; selected?: boolean; booked?: boolean } | "." | "-"

type Hall = {
    id: number
    seat_map_template: string
}

type Movie = {
    id: number
    title: string
}

type Seat = {
    row: number
    col: number
    price?: number
}

type Ticket = {
    sessionId: number
    hallId: number
    movieId: number
    movieTitle: string
    time: string
    seats: {
        row: number
        col: number
        rowLabel: number
        seatNumber: number
        price: number
    }[]
    totalPrice: number
}

type Session = {
    id: number
    movie_id: number
    hall_id: number
    seat_map: string
    time: string
    date?: string // Extracted from time for grouping
}

const parseSeatMap = (input: string): SeatCell[][] => {
    if (!input) return []
    const lines = input.trim().split("\n")
    return lines.map((line, rowIdx) =>
        line.split("").map((char, colIdx) => {
            if (char === "." || char === "-") return char
            if (char === "a" || char === "b")
                return { type: char as SeatType, row: rowIdx, col: colIdx, selected: false }
            if (char === "x")
                return { type: "x" as SeatType, row: rowIdx, col: colIdx, booked: true }
            return "-"
        })
    )
}

const getSeatColor = (type: SeatType, selected: boolean = false, booked: boolean = false) => {
    if (selected) return "#ff5722" // Orange color for selected seats

    switch (type) {
        case "a":
            return "#4caf50"
        case "b":
            return "#1976d2"
        case "x":
            return "#000000"
        default:
            return "grey"
    }
}

const fetchHalls = async (): Promise<Hall[]> => {
    const res = await fetch(Api.HALLS_ADMIN)
    if (!res.ok) throw new Error("Не вдалося завантажити зали")
    return res.json()
}

const fetchSessions = async (): Promise<Session[]> => {
    const res = await fetch(Api.SESSIONS_ADMIN)
    if (!res.ok) throw new Error("Не вдалося завантажити сеанси")
    const sessions = await res.json()
    return sessions.map(session => ({
        ...session,
        date: new Date(session.time).toLocaleDateString('uk-UA')
    }))
}

const fetchSeatPrice = async (sessionId: number, seatType: string): Promise<number> => {
    return seatType === 'a' ? 100 : 150
}

const fetchMovies = async (): Promise<Movie[]> => {
    const res = await fetch(Api.MOVIES_ADMIN_SHORT)
    if (!res.ok) throw new Error("Не вдалося завантажити фільми")
    return res.json()
}

const getMovieImageUrl = (movieId: number): string => {
    return `${Api.IMAGES_MOVIES}/${movieId}`
}

export default function SeatPicker() {
    const [halls, setHalls] = useState<Hall[]>([])
    const [movies, setMovies] = useState<Movie[]>([])
    const [sessions, setSessions] = useState<Session[]>([])
    const [selectedDate, setSelectedDate] = useState<string>("") 
    const [selectedMovieId, setSelectedMovieId] = useState<number | "">("")
    const [selectedSessionId, setSelectedSessionId] = useState<number | "">("")
    const [mapText, setMapText] = useState("")
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
    const [ticket, setTicket] = useState<Ticket | null>(null)
    const [showTicket, setShowTicket] = useState(false)

    const selectedSession = sessions.find(session => session.id === selectedSessionId)
    const selectedMovie = selectedSession ? movies.find(movie => movie.id === selectedSession.movie_id) : undefined
    const selectedHall = selectedSession ? halls.find(hall => hall.id === selectedSession.hall_id) : undefined

    const seatMap = useMemo(() => parseSeatMap(mapText), [mapText])

    const { rowLabels, seatNumbers } = useMemo(() => {
        const totalRows = seatMap.length
        const rowLabels = seatMap.map((_, idx) => totalRows - idx)
        const seatNumbers = seatMap.map(row => {
            let count = 0
            return row.map(cell => {
                if (typeof cell === "object") {
                    count += 1
                    return count
                }
                return null
            })
        })
        return { rowLabels, seatNumbers }
    }, [seatMap])

    useEffect(() => {
        Promise.all([
            fetchHalls(),
            fetchMovies(),
            fetchSessions()
        ])
            .then(([hallsData, moviesData, sessionsData]) => {
                setHalls(hallsData)
                setMovies(moviesData)
                setSessions(sessionsData)
                
                if (sessionsData.length > 0) {
                    const uniqueDates = [...new Set(sessionsData.map(s => s.date || ''))].sort()
                    if (uniqueDates.length > 0) {
                        setSelectedDate(uniqueDates[0])
                        const sessionsForDate = sessionsData.filter(s => s.date === uniqueDates[0])
                        
                        if (sessionsForDate.length > 0) {
                            const uniqueMovieIds = [...new Set(sessionsForDate.map(s => s.movie_id))]
                            if (uniqueMovieIds.length > 0) {
                                setSelectedMovieId(uniqueMovieIds[0])
                                const sessionsForMovie = sessionsForDate.filter(s => s.movie_id === uniqueMovieIds[0])
                                if (sessionsForMovie.length > 0) {
                                    setSelectedSessionId(sessionsForMovie[0].id)
                                    setMapText(sessionsForMovie[0].seat_map || 
                                              hallsData.find(h => h.id === sessionsForMovie[0].hall_id)?.seat_map_template || "")
                                }
                            }
                        }
                    }
                }
            })
            .catch(err => alert(err.message))
    }, [])

    const availableDates = useMemo(() => {
        return [...new Set(sessions.map(s => s.date || ''))].sort()
    }, [sessions])

    const availableMovies = useMemo(() => {
        if (!selectedDate) return []
        const sessionsForDate = sessions.filter(s => s.date === selectedDate)
        const movieIds = [...new Set(sessionsForDate.map(s => s.movie_id))]
        return movies.filter(movie => movieIds.includes(movie.id))
    }, [sessions, movies, selectedDate])

    const availableSessions = useMemo(() => {
        if (!selectedDate || !selectedMovieId) return []
        return sessions.filter(s => 
            s.date === selectedDate && 
            s.movie_id === selectedMovieId
        ).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    }, [sessions, selectedDate, selectedMovieId])

    const handleDateChange = (event: SelectChangeEvent<string>) => {
        const date = event.target.value
        setSelectedDate(date)
        setSelectedMovieId("")
        setSelectedSessionId("")
        setSelectedSeats([])
        setShowTicket(false)

        const sessionsForDate = sessions.filter(s => s.date === date)
        const movieIds = [...new Set(sessionsForDate.map(s => s.movie_id))]
        if (movieIds.length > 0) {
            setSelectedMovieId(movieIds[0])

            const sessionsForMovie = sessionsForDate.filter(s => s.movie_id === movieIds[0])
            if (sessionsForMovie.length > 0) {
                setSelectedSessionId(sessionsForMovie[0].id)
                setMapText(sessionsForMovie[0].seat_map || 
                          halls.find(h => h.id === sessionsForMovie[0].hall_id)?.seat_map_template || "")
            }
        }
    }

    const handleMovieChange = (event: SelectChangeEvent<number>) => {
        const movieId = Number(event.target.value)
        setSelectedMovieId(movieId)
        setSelectedSessionId("")
        setSelectedSeats([])
        setShowTicket(false)

        const sessionsForMovie = sessions.filter(s => 
            s.date === selectedDate && 
            s.movie_id === movieId
        )
        if (sessionsForMovie.length > 0) {
            setSelectedSessionId(sessionsForMovie[0].id)
            setMapText(sessionsForMovie[0].seat_map || 
                      halls.find(h => h.id === sessionsForMovie[0].hall_id)?.seat_map_template || "")
        }
    }

    const handleSessionChange = (event: SelectChangeEvent<number>) => {
        const sessionId = Number(event.target.value)
        setSelectedSessionId(sessionId)
        setSelectedSeats([])
        setShowTicket(false)
        
        const session = sessions.find(s => s.id === sessionId)
        if (session) {
            setMapText(session.seat_map || halls.find(h => h.id === session.hall_id)?.seat_map_template || "")
        }
    }

    const handleSeatClick = async (rowIndex: number, colIndex: number) => {
        const cell = seatMap[rowIndex][colIndex]
        if (typeof cell !== "object") return
        if (cell.booked) return

        let price = 0
        if (selectedSessionId) {
            price = await fetchSeatPrice(Number(selectedSessionId), cell.type)
        }

        const seatIndex = selectedSeats.findIndex(
            seat => seat.row === rowIndex && seat.col === colIndex
        )

        if (seatIndex >= 0) {
            setSelectedSeats(prev => prev.filter((_, idx) => idx !== seatIndex))
        } else {
            setSelectedSeats(prev => [...prev, { row: rowIndex, col: colIndex, price }])
        }
        
        // Hide ticket when changing seat selection
        setShowTicket(false)
    }

    const isSeatSelected = (rowIndex: number, colIndex: number) => {
        return selectedSeats.some(
            seat => seat.row === rowIndex && seat.col === colIndex
        )
    }
    
    const handleBookSeats = () => {
        if (!selectedSessionId || selectedSeats.length === 0) return
        
        const session = sessions.find(s => s.id === selectedSessionId)
        const movie = movies.find(m => m.id === session?.movie_id)
        const hall = halls.find(h => h.id === session?.hall_id)
        
        if (!session || !movie || !hall) return

        const newTicket: Ticket = {
            sessionId: session.id,
            hallId: hall.id,
            movieId: movie.id,
            movieTitle: movie.title,
            time: session.time,
            seats: selectedSeats.map(seat => ({
                row: seat.row,
                col: seat.col,
                rowLabel: rowLabels[seat.row],
                seatNumber: seatNumbers[seat.row][seat.col] || 0,
                price: seat.price || 0
            })),
            totalPrice: selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0)
        }
        
        setTicket(newTicket)
        setShowTicket(true)
    }

    const handleConfirmBuying = async () => {
        const token = localStorage.getItem('token')
        if (!ticket || !ticket.sessionId || !ticket.seats?.length) {
            alert("Дані квитка некоректні");
            return;
        }
        const response = await fetch(Api.TICKETS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                session_id: ticket.sessionId,
                seats: ticket.seats.map(seat => ({
                    row: seat.rowLabel,
                    col: seat.seatNumber
                }))
            })
        })
        if(response.ok) alert("Ура")
        if(response.status == 401)
        {
            localStorage.removeItem('token')
            window.location.href = '/buy_tickets'
        }
        if (!response.ok) throw new Error("Не вдалося купити квитки")
    }

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            {/* Session selection and movie information */}
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" gutterBottom>
                    Вибір сеансу
                </Typography>
                
                <Box display="flex" gap={2}>
                    {/* Date selection */}
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="date-select-label">Дата</InputLabel>
                        <Select
                            labelId="date-select-label"
                            value={selectedDate}
                            onChange={handleDateChange}
                            label="Дата"
                        >
                            {availableDates.map((date) => (
                                <MenuItem key={date} value={date}>
                                    {date}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Movie selection */}
                    <FormControl sx={{ minWidth: 200 }} disabled={!selectedDate}>
                        <InputLabel id="movie-select-label">Фільм</InputLabel>
                        <Select
                            labelId="movie-select-label"
                            value={selectedMovieId}
                            onChange={handleMovieChange}
                            label="Фільм"
                        >
                            {availableMovies.map((movie) => (
                                <MenuItem key={movie.id} value={movie.id}>
                                    {movie.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Session time selection */}
                    <FormControl sx={{ minWidth: 150 }} disabled={!selectedMovieId}>
                        <InputLabel id="session-select-label">Час</InputLabel>
                        <Select
                            labelId="session-select-label"
                            value={selectedSessionId}
                            onChange={handleSessionChange}
                            label="Час"
                        >
                            {availableSessions.map((session) => (
                                <MenuItem key={session.id} value={session.id}>
                                    {new Date(session.time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                
                {/* Movie info card */}
                {selectedMovie && selectedSession && (
                    <Box display="flex" gap={3} mt={2}>
                        <Card sx={{ maxWidth: 300, display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={getMovieImageUrl(selectedMovie.id)}
                                alt={selectedMovie.title}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {selectedMovie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Дата: {selectedDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Час: {new Date(selectedSession.time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                                {selectedHall && (
                                    <Typography variant="body2" color="text.secondary">
                                        Зала: {selectedHall.id}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                        
                        <Box>
                            <Typography variant="body1" fontWeight="bold">
                                Вибрано місць: {selectedSeats.length}
                            </Typography>
                            {selectedSeats.length > 0 && (
                                <Typography variant="body2">
                                    Загальна вартість: {selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0)} грн
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>

            <Box display="flex" gap={4}>

                {/* Інтерактивна карта зали */}
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        Виберіть місця
                    </Typography>
                    <Box display="flex" gap={2} pt={1}>
                        {/* підписи рядів */}
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                            gap={`${SeatUIValues.ROW_GAP}px`}
                            width={SeatUIValues.ROW_LABEL_WIDTH}
                        >
                            {rowLabels.map(lbl => (
                                <Box
                                    key={lbl}
                                    sx={{
                                        width: "100%",
                                        height: SeatUIValues.ROW_HEIGHT,
                                        lineHeight: `${SeatUIValues.ROW_HEIGHT}px`,
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        userSelect: "none",
                                    }}
                                >
                                    {lbl}
                                </Box>
                            ))}
                        </Box>

                        {/* місця */}
                        <Box display="flex" flexDirection="column" gap={`${SeatUIValues.ROW_GAP}px`}>
                            {seatMap.map((row, rowIndex) => (
                                <Box key={rowIndex} display="flex" gap={`${SeatUIValues.SEAT_GAP}px`}>
                                    {row.map((cell, colIndex) => {
                                        if (cell === ".") {
                                            return (
                                                <Box
                                                    key={colIndex}
                                                    height={SeatUIValues.SEAT_HEIGHT}
                                                    sx={{
                                                        width: `calc(${SeatUIValues.HALF_OFFSET_WIDTH}px - ${SeatUIValues.SEAT_GAP / 2}px)`
                                                    }}
                                                />
                                            )
                                        }
                                        if (cell === "-") {
                                            return (
                                                <Box
                                                    key={colIndex}
                                                    width={SeatUIValues.SEAT_WIDTH}
                                                    height={SeatUIValues.SEAT_HEIGHT}
                                                />
                                            )
                                        }
                                        const { type, booked } = cell
                                        const num = seatNumbers[rowIndex][colIndex]
                                        const selected = isSeatSelected(rowIndex, colIndex)
                                        return (
                                            <Box
                                                key={colIndex}
                                                width={SeatUIValues.SEAT_WIDTH}
                                                height={SeatUIValues.SEAT_HEIGHT}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                bgcolor={getSeatColor(type, selected, booked)}
                                                color="#fff"
                                                fontSize={14}
                                                fontWeight="bold"
                                                borderRadius={0}
                                                userSelect="none"
                                                onClick={() => handleSeatClick(rowIndex, colIndex)}
                                                sx={{
                                                    cursor: booked ? "not-allowed" : "pointer",
                                                    transition: "background-color 0.2s",
                                                    "&:hover": {
                                                        opacity: booked ? 1 : 0.8,
                                                    },
                                                }}
                                            >
                                                {num}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Інформація про вибрані місця */}
                    {selectedSeats.length > 0 && (
                        <Box mt={3}>
                            <Typography variant="subtitle1">Вибрані місця:</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                                {selectedSeats.map((seat, idx) => {
                                    const rowNum = rowLabels[seat.row];
                                    const seatNum = seatNumbers[seat.row][seat.col];
                                    return (
                                        <Box
                                            key={idx}
                                            px={1.5}
                                            py={0.5}
                                            bgcolor="#f5f5f5"
                                            borderRadius={1}
                                            fontSize={14}
                                        >
                                            Ряд {rowNum}, Місце {seatNum}
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        disabled={selectedSeats.length === 0 || !selectedSessionId}
                        onClick={handleBookSeats}
                    >
                        Забронювати місця ({selectedSeats.length})
                    </Button>
                </Box>
            </Box>
            
            {/* Ticket display */}
            {showTicket && ticket && (
                <Box 
                    mt={4} 
                    p={3} 
                    border="1px solid #ccc" 
                    borderRadius={2} 
                    bgcolor="#f9f9f9"
                    boxShadow={2}
                >
                    <Typography variant="h5" mb={2} color="primary">
                        Квиток
                    </Typography>
                    
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Box>
                            <Typography variant="h6">{ticket.movieTitle}</Typography>
                            <Typography variant="body1">
                                Дата і час: {new Date(ticket.time).toLocaleDateString('uk-UA')} {new Date(ticket.time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Typography variant="body1">Зала: {ticket.hallId}</Typography>
                        </Box>
                        
                        <Box>
                            <Typography variant="h6" textAlign="right">Загальна вартість:</Typography>
                            <Typography variant="h5" color="primary" textAlign="right">{ticket.totalPrice} грн</Typography>
                        </Box>
                    </Box>
                    
                    <Typography variant="subtitle1" mb={1}>Місця:</Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                        {ticket.seats.map((seat, idx) => (
                            <Box 
                                key={idx}
                                p={1.5}
                                bgcolor="white"
                                borderRadius={1}
                                border="1px solid #ddd"
                            >
                                <Typography variant="body2">Ряд {seat.rowLabel}, Місце {seat.seatNumber}</Typography>
                                <Typography variant="body2" fontWeight="bold">{seat.price} грн</Typography>
                            </Box>
                        ))}
                    </Box>
                    
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button variant="outlined" onClick={() => setShowTicket(false)}>
                            Назад до вибору місць
                        </Button>
                        <Button variant="contained" color="success" onClick={async () => await handleConfirmBuying()}>
                            Підтвердити замовлення
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    )
}