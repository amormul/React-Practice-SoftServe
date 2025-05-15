import type { SeatType } from "../types"

export class Seat {
    row: number
    col: number
    type: SeatType
    hallId: number
    sessionId: number

    constructor(row: number, col: number, type: SeatType, hallId: number, sessionId: number) {
        this.row = row
        this.col = col
        this.type = type
        this.hallId = hallId
        this.sessionId = sessionId
    }

    // Перевірка, чи місце доступне для вибору
    isSelectable(): boolean {
        return this.type !== "-" && this.type !== "x"
    }

    // Отримання ціни місця
    getPrice(): number {
        if (this.type === "a") return 100
        if (this.type === "b") return 150
        return 0
    }
}
