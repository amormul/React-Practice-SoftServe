import type {ITicket} from "../types"

export class Ticket implements ITicket {
    id: number | string
    userId: string
    sessionId: number
    hallId: number
    row: number
    col: number
    purchaseDate: Date

    constructor(
        id: number | string,
        userId: string,
        sessionId: number,
        hallId: number,
        row: number,
        col: number,
        purchaseDate: Date = new Date(),
    ) {
        this.id = id
        this.userId = userId
        this.sessionId = sessionId
        this.hallId = hallId
        this.row = row
        this.col = col
        this.purchaseDate = purchaseDate
    }

    // Отримання унікального ідентифікатора місця
    getSeatIdentifier(): string {
        return `${this.hallId}-${this.sessionId}-${this.row}-${this.col}`
    }

    // Отримання інформації про квиток у текстовому форматі
    getTicketInfo(): string {
        return `Квиток #${this.id}
Зал: ${this.hallId}
Сеанс: ${this.sessionId}
Ряд: ${this.row + 1}
Місце: ${this.col + 1}
Користувач: ${this.userId}
Дата покупки: ${this.purchaseDate.toLocaleString()}`
    }
}
