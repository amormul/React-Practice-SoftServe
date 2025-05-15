"use client"

import type React from "react"

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material"
import type { Hall } from "../model/Hall"
import type { Session } from "../model/MovieSession"

interface HallSessionSelectorProps {
    halls: Hall[]
    sessions: Session[]
    selectedHallId: number
    selectedSessionId: number
    onHallChange: (hallId: number) => void
    onSessionChange: (sessionId: number) => void
}

const HallSessionSelector: React.FC<HallSessionSelectorProps> = ({
    halls,
    sessions,
    selectedHallId,
    selectedSessionId,
    onHallChange,
    onSessionChange,
}) => {
    const handleHallChange = (event: SelectChangeEvent<number>) => {
        onHallChange(event.target.value as number)
    }

    const handleSessionChange = (event: SelectChangeEvent<number>) => {
        onSessionChange(event.target.value as number)
    }

    return (
        <div className="flex gap-4">
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>Зал</InputLabel>
                <Select value={selectedHallId} onChange={handleHallChange} label="Зал">
                    {halls.map((hall) => (
                        <MenuItem key={hall.id} value={hall.id}>
                            {hall.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel>Сеанс</InputLabel>
                <Select value={selectedSessionId} onChange={handleSessionChange} label="Сеанс">
                    {sessions.map((session) => (
                        <MenuItem key={session.id} value={session.id}>
                            {session.movieTitle} - {session.time}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default HallSessionSelector
