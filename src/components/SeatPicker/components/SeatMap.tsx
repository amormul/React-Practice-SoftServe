"use client"

import type React from "react"
import { useEffect, useRef } from "react"

import { Box, ButtonBase } from "@mui/material"
import type { Seat } from "../model/Seat"
import type { SeatType } from "../types"

interface SeatMapProps {
    seatMap: Seat[][]
    selectedSeats: Seat[]
    onSeatClick: (seat: Seat) => void
}

const SeatMap: React.FC<SeatMapProps> = ({ seatMap, selectedSeats, onSeatClick }) => {
    // Перевіряємо, чи місце вже вибране
    const isSelected = (seat: Seat) =>
        selectedSeats.some(
            (s) => s.row === seat.row && s.col === seat.col && s.hallId === seat.hallId && s.sessionId === seat.sessionId,
        )

    // Визначаємо колір місця
    const getSeatColor = (type: SeatType, selected: boolean) => {
        if (type === "-") return "transparent"
        if (type === "x") return "#d32f2f"
        if (selected) return "#fbc02d"
        if (type === "a") return "#4caf50"
        if (type === "b") return "#1976d2"
        return "grey"
    }

    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Force layout recalculation when seatMap changes
        if (mapContainerRef.current) {
            // This will force the browser to recalculate the layout
            void mapContainerRef.current.offsetHeight
        }
    }, [seatMap])

    if (seatMap.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="400px"
                width="500px"
                border="1px dashed #555"
                borderRadius={2}
            >
                Завантаження карти місць...
            </Box>
        )
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="start"
            gap={2}
            ref={mapContainerRef}
            key={seatMap.length > 0 ? `${seatMap[0][0].hallId}-${seatMap[0][0].sessionId}` : "loading"}
        >
            {/* Лівий стовпчик з номерами рядів */}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" gap={1}>
                {seatMap.map((row) => (
                    <Box
                        key={`label-${row[0].row}`}
                        sx={{
                            width: 30,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            fontSize: "14px",
                            fontWeight: "bold",
                            lineHeight: "40px",
                        }}
                    >
                        {row[0].row + 1}
                    </Box>
                ))}
            </Box>

            {/* Сам селектор місць */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                {seatMap.map((row, rowIndex) => (
                    <Box key={rowIndex} display="flex" gap={1}>
                        {row.map((seat) => {
                            const selected = isSelected(seat)
                            const color = getSeatColor(seat.type, selected)

                            if (seat.type === "-") {
                                return <Box key={`${seat.row}-${seat.col}`} width={40} height={40} />
                            }

                            return (
                                <ButtonBase
                                    key={`${seat.row}-${seat.col}`}
                                    onClick={() => onSeatClick(seat)}
                                    disabled={seat.type === "x"}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: color,
                                        borderRadius: 2,
                                        border: "1px solid #333",
                                        transition: "background-color 0.3s, transform 0.1s",
                                        "&:hover": {
                                            backgroundColor: seat.type !== "x" ? "rgba(255, 255, 255, 0.2)" : undefined,
                                        },
                                        "&:active": {
                                            transform: "scale(0.95)",
                                        },
                                    }}
                                >
                                    {seat.col + 1}
                                </ButtonBase>
                            )
                        })}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default SeatMap
