"use client"

import type React from "react"

import { useState } from "react"
import { Box, IconButton, Button, Tabs, Tab, CircularProgress } from "@mui/material"
import type { Seat } from "../model/Seat"
import type { Hall } from "../model/Hall"
import type { Session } from "../model/MovieSession.ts"
import type { Ticket } from "../model/Ticket"
import { PDFService } from "../server/PDFService"

interface TicketPanelProps {
    selectedSeats: Seat[]
    halls: Hall[]
    sessions: Session[]
    onRemoveSeat: (seat: Seat) => void
    onPurchase: () => void
    userTickets: Ticket[]
}

const TicketPanel: React.FC<TicketPanelProps> = ({
    selectedSeats,
    halls,
    sessions,
    onRemoveSeat,
    onPurchase,
    userTickets,
}) => {
    const [activeTab, setActiveTab] = useState(0)
    const [downloadingTicket, setDownloadingTicket] = useState<string | number | null>(null)

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    // Отримання інформації про зал і сеанс
    const getHallAndSession = (hallId: number, sessionId: number) => {
        const hall = halls.find((h) => h.id === hallId)
        const session = sessions.find((s) => s.id === sessionId)
        return { hall, session }
    }

    // Обробник завантаження квитка у PDF
    const handleDownloadTicket = async (ticket: Ticket) => {
        try {
            setDownloadingTicket(ticket.id)
            const { hall, session } = getHallAndSession(ticket.hallId, ticket.sessionId)
            await PDFService.downloadTicketPDF(ticket, hall, session)
        } catch (error) {
            console.error("Error downloading ticket:", error)
            alert("Помилка при завантаженні квитка. Спробуйте ще раз.")
        } finally {
            setDownloadingTicket(null)
        }
    }

    return (
        <Box
            minWidth={300}
            maxHeight={500}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            border="1px solid #555"
            borderRadius={2}
            bgcolor="#1c1c1c"
            color="#fff"
            overflow="hidden"
        >
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                <Tab label="Вибрані місця" />
                <Tab label="Мої квитки" />
            </Tabs>

            {activeTab === 0 && (
                <>
                    <Box overflow="auto" flex={1} p={2}>
                        {selectedSeats.length === 0 ? (
                            <Box fontStyle="italic" color="#aaa">
                                Місця не вибрані
                            </Box>
                        ) : (
                            selectedSeats.map((seat, idx) => {
                                const price = seat.getPrice()
                                const { hall, session } = getHallAndSession(seat.hallId, seat.sessionId)

                                return (
                                    <Box key={idx} mb={1} display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Box fontSize="12px" color="#aaa">
                                                {hall?.name}, {session?.movieTitle}, {session?.time}
                                            </Box>
                                            <Box>
                                                Ряд: {seat.row + 1}, Місце: {seat.col + 1}, {price} грн
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => onRemoveSeat(seat)}
                                            sx={{
                                                color: "#ff5f5f",
                                                ml: 1,
                                                padding: 0.5,
                                            }}
                                        >
                                            ✖
                                        </IconButton>
                                    </Box>
                                )
                            })
                        )}
                    </Box>

                    <Box p={2} borderTop="1px solid #555">
                        <Box fontWeight="bold" mb={2}>
                            Сума:{" "}
                            {selectedSeats.reduce((sum, seat) => {
                                return sum + seat.getPrice()
                            }, 0)}{" "}
                            грн
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={selectedSeats.length === 0}
                            onClick={onPurchase}
                        >
                            Купити квитки
                        </Button>
                    </Box>
                </>
            )}

            {activeTab === 1 && (
                <Box overflow="auto" flex={1} p={2}>
                    {userTickets.length === 0 ? (
                        <Box fontStyle="italic" color="#aaa">
                            У вас немає квитків
                        </Box>
                    ) : (
                        userTickets.map((ticket, idx) => {
                            const { hall, session } = getHallAndSession(ticket.hallId, ticket.sessionId)
                            const isDownloading = downloadingTicket === ticket.id

                            return (
                                <Box key={idx} mb={2} p={2} border="1px solid #444" borderRadius={1} bgcolor="#2a2a2a">
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Box>
                                            <Box fontWeight="bold" mb={1}>
                                                Квиток #{ticket.id.toString().slice(-6)}
                                            </Box>
                                            <Box fontSize="14px" mb={0.5}>
                                                <strong>Фільм:</strong> {session?.movieTitle}
                                            </Box>
                                            <Box fontSize="14px" mb={0.5}>
                                                <strong>Зал:</strong> {hall?.name}
                                            </Box>
                                            <Box fontSize="14px" mb={0.5}>
                                                <strong>Дата і час:</strong> {session?.date}, {session?.time}
                                            </Box>
                                            <Box fontSize="14px" mb={0.5}>
                                                <strong>Ряд:</strong> {ticket.row + 1}, <strong>Місце:</strong> {ticket.col + 1}
                                            </Box>
                                            <Box fontSize="12px" color="#aaa" mt={1}>
                                                Придбано: {ticket.purchaseDate.toLocaleString()}
                                            </Box>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleDownloadTicket(ticket)}
                                            disabled={isDownloading}
                                            startIcon={isDownloading ? <CircularProgress size={16} /> : <b>Скачати</b>}
                                            sx={{ minWidth: "40px", height: "32px" }}
                                        >
                                            {isDownloading ? "Завантаження..." : "PDF"}
                                        </Button>
                                    </Box>
                                </Box>
                            )
                        })
                    )}
                </Box>
            )}
        </Box>
    )
}

export default TicketPanel
