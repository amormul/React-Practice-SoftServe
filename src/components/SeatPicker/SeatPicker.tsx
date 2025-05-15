"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import type { Seat } from "./model/Seat"
import { Ticket } from "./model/Ticket"
import { ServerEmulator } from "./server/ServerEmulator"
import { TicketService } from "./server/TicketService"
import HallSessionSelector from "./components/HallSessionSelector"
import SeatMap from "./components/SeatMap"
import TicketPanel from "./components/TicketPanel"

interface SeatPickerProps {
    userId: string
}

const SeatPicker: React.FC<SeatPickerProps> = ({ userId }) => {
    const [selectedHallId, setSelectedHallId] = useState<number>(1)
    const [selectedSessionId, setSelectedSessionId] = useState<number>(1)
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
    const [seatMap, setSeatMap] = useState<Seat[][]>([])
    const [halls] = useState(ServerEmulator.getHalls())
    const [sessions] = useState(ServerEmulator.getSessions())
    const [userTickets, setUserTickets] = useState<Ticket[]>([])

    // Завантаження карти місць при зміні залу або сеансу
    useEffect(() => {
        const loadSeatMap = async () => {
            // Clear the current seat map before loading the new one
            setSeatMap([])

            try {
                const map = await ServerEmulator.getSeatMap(selectedHallId, selectedSessionId)
                setSeatMap(map)
            } catch (error) {
                console.error("Error loading seat map:", error)
                // Set an empty map in case of error
                setSeatMap([])
            }
        }

        loadSeatMap().then(() =>  setSelectedSeats([]))
    }, [selectedHallId, selectedSessionId])

    // Завантаження квитків користувача
    useEffect(() => {
        const loadUserTickets = async () => {
            const tickets = await TicketService.getUserTickets(userId)
            setUserTickets(tickets)
        }

        loadUserTickets().then(() => {})
    }, [userId])

    // Обробник вибору залу
    const handleHallChange = (hallId: number) => {
        setSelectedHallId(hallId)

        // Вибираємо перший доступний сеанс для нового залу
        const firstSessionForHall = sessions.find((session) => session.hallId === hallId)
        if (firstSessionForHall) {
            setSelectedSessionId(firstSessionForHall.id)
        }
    }

    // Обробник вибору сеансу
    const handleSessionChange = (sessionId: number) => {
        setSelectedSessionId(sessionId)
    }

    // Обробник вибору місця
    const handleSeatSelect = (seat: Seat) => {
        if (isSelected(seat)) {
            setSelectedSeats((prev) =>
                prev.filter(
                    (s) =>
                        !(s.row === seat.row && s.col === seat.col && s.hallId === seat.hallId && s.sessionId === seat.sessionId),
                ),
            )
        } else {
            setSelectedSeats((prev) => [...prev, seat])
        }
    }

    // Перевірка, чи місце вже вибране
    const isSelected = (seat: Seat) =>
        selectedSeats.some(
            (s) => s.row === seat.row && s.col === seat.col && s.hallId === seat.hallId && s.sessionId === seat.sessionId,
        )

    // Обробник купівлі квитків
    const handlePurchaseTickets = async () => {
        if (selectedSeats.length === 0) return

        try {
            // Створюємо квитки для вибраних місць
            const tickets = selectedSeats.map(
                (seat) =>
                    new Ticket(
                        Date.now() + Math.random(), // Генеруємо унікальний ID
                        userId,
                        seat.sessionId,
                        seat.hallId,
                        seat.row,
                        seat.col,
                    ),
            )

            // Зберігаємо квитки на сервері
            await TicketService.purchaseTickets(tickets)

            // Оновлюємо квитки користувача
            setUserTickets((prev) => [...prev, ...tickets])

            // Оновлюємо карту місць
            const updatedMap = await ServerEmulator.getSeatMap(selectedHallId, selectedSessionId)
            setSeatMap(updatedMap)

            // Скидаємо вибрані місця
            setSelectedSeats([])

            alert("Квитки успішно придбано!")
        } catch (error) {
            alert(`Помилка при купівлі квитків: ${error}`)
        }
    }

    // Фільтруємо сеанси для вибраного залу
    const filteredSessions = sessions.filter((session) => session.hallId === selectedHallId)

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <HallSessionSelector
                halls={halls}
                sessions={filteredSessions}
                selectedHallId={selectedHallId}
                selectedSessionId={selectedSessionId}
                onHallChange={handleHallChange}
                onSessionChange={handleSessionChange}
            />

            <Box display="flex" flexDirection="row" alignItems="start" gap={2}>
                <SeatMap
                    seatMap={seatMap}
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatSelect}
                    key={`${selectedHallId}-${selectedSessionId}`} // Add this key prop
                />

                <TicketPanel
                    selectedSeats={selectedSeats}
                    halls={halls}
                    sessions={sessions}
                    onRemoveSeat={handleSeatSelect}
                    onPurchase={handlePurchaseTickets}
                    userTickets={userTickets}
                />
            </Box>
        </Box>
    )
}

export default SeatPicker
