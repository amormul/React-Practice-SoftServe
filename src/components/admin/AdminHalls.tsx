"use client"

import React, {useState, useMemo, useEffect} from "react"
import {SeatUIValues} from "../constants/SeatPickerValues"
import {Api} from "../api/config"
import {
    Box,
    TextField,
    Typography,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material"

type SeatType = "a" | "b"
type SeatCell = { type: SeatType; row: number; col: number } | "." | "-"

type Hall = {
    id: number
    seat_map_template: string
}

const parseSeatMap = (input: string): SeatCell[][] => {
    if (!input) return []
    const lines = input.trim().split("\n")
    return lines.map((line, rowIdx) =>
        line.split("").map((char, colIdx) => {
            if (char === "." || char === "-") return char
            if (char === "a" || char === "b")
                return {type: char as SeatType, row: rowIdx, col: colIdx}
            return "-"
        })
    )
}

const getSeatColor = (type: SeatType) => {
    switch (type) {
        case "a":
            return "#4caf50"
        case "b":
            return "#1976d2"
        default:
            return "grey"
    }
}


const fetchHalls = async (): Promise<Hall[]> => {
    const res = await fetch(Api.HALLS_ADMIN)
    if (!res.ok) throw new Error("Не вдалося завантажити зали")
    return res.json()
}

const createHall = async (hall: Hall): Promise<Hall> => {
    const res = await fetch(Api.HALLS_ADMIN, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(hall),
    })
    if (!res.ok) throw new Error("Не вдалося створити зал")
    return res.json()
}

const updateHall = async (id: number, seat_map_template: string): Promise<void> => {
    const res = await fetch(Api.HALLS_ADMIN + "/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({seat_map_template}),
    })
    if (!res.ok) throw new Error("Не вдалося оновити зал")
}

const deleteHall = async (id: number): Promise<void> => {
    const res = await fetch(Api.HALLS_ADMIN + "/" + id, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Не вдалося видалити зал")
}

export default function SeatMapEditor() {
    const [halls, setHalls] = useState<Hall[]>([])
    const [selectedHallIndex, setSelectedHallIndex] = useState(0)
    const [mapText, setMapText] = useState("")

    const selectedHall = halls[selectedHallIndex]

    const seatMap = useMemo(() => parseSeatMap(mapText), [mapText])

    const {rowLabels, seatNumbers} = useMemo(() => {
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
        return {rowLabels, seatNumbers}
    }, [seatMap])

    useEffect(() => {
        fetchHalls()
            .then(data => {
                setHalls(data)
                setSelectedHallIndex(0)
                setMapText(data[0]?.seat_map_template ?? "")
            })
            .catch(err => alert(err.message))
    }, [])

    const handleHallChange = (event: SelectChangeEvent<number>) => {
        const index = Number(event.target.value)
        setSelectedHallIndex(index)
        setMapText(halls[index].seat_map_template)
    }

    const handleUpdateHall = async () => {
        const updated = [...halls]
        const hall = updated[selectedHallIndex]
        hall.seat_map_template = mapText
        setHalls(updated)
        try {
            await updateHall(hall.id, mapText)
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const handleAddHall = async () => {
        const nextId = halls.length + 1
        const template = halls.length !== 0 ? halls[selectedHallIndex].seat_map_template : ""
        const newHall: Hall = {id: nextId, seat_map_template: template}
        try {
            await createHall(newHall)
            const updated = [...halls, newHall]
            setHalls(updated)
            setSelectedHallIndex(updated.length - 1)
            setMapText(newHall.seat_map_template)
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const handleDeleteHall = async () => {
        if (halls.length === 1) return
        const hallToDelete = halls[selectedHallIndex]
        try {
            await deleteHall(hallToDelete.id)
            const updated = halls.filter((_, i) => i !== selectedHallIndex)
            setHalls(updated)
            setSelectedHallIndex(0)
            setMapText(updated[0].seat_map_template)
        } catch (err) {
            alert((err as Error).message)
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" alignItems="center" gap={2}>
                <Select
                    value={selectedHallIndex}
                    onChange={handleHallChange}
                    size="small"
                >
                    {halls.map((hall, index) => (
                        <MenuItem key={hall.id} value={index}>
                            Зала {hall.id}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="primary" onClick={handleUpdateHall}>
                    Зберегти зміни
                </Button>
                <Button variant="outlined" onClick={handleAddHall}>
                    Додати зал
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteHall}
                    disabled={halls.length === 1}
                >
                    Видалити
                </Button>
            </Box>

            <Box display="flex" gap={4}>
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        Шаблон карти: <strong>{selectedHall?.id}</strong>
                    </Typography>
                    <TextField
                        multiline
                        minRows={15}
                        fullWidth
                        value={mapText}
                        onChange={e => setMapText(e.target.value)}
                        sx={{fontFamily: "monospace", whiteSpace: "pre"}}
                    />
                    <Typography variant="caption" display="block" mt={1}>
                        Символи: <strong>a</strong>, <strong>b</strong> — місце;
                        <strong>_</strong> — повний відступ;
                        <strong>.</strong> — піввідступ
                    </Typography>
                </Box>

                {/* прев'ю */}
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        Попередній перегляд
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
                                        const {type} = cell
                                        const num = seatNumbers[rowIndex][colIndex]
                                        return (
                                            <Box
                                                key={colIndex}
                                                width={SeatUIValues.SEAT_WIDTH}
                                                height={SeatUIValues.SEAT_HEIGHT}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                bgcolor={getSeatColor(type)}
                                                color="#fff"
                                                fontSize={14}
                                                fontWeight="bold"
                                                borderRadius={0}
                                                userSelect="none"
                                            >
                                                {num}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
