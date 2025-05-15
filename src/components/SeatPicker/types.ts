// Типи місць
export type SeatType = "-" | "x" | "a" | "b"

// Інтерфейс для залу
export interface IHall {
    id: number
    name: string
    seatMapTemplate: string
}

// Інтерфейс для сеансу
export interface ISession {
    id: number
    hallId: number
    time: string
    movieTitle: string
    date: string
    reservedSeats: { row: number; col: number }[]
}

// Інтерфейс для квитка
export interface ITicket {
    id: number | string
    userId: string
    sessionId: number
    hallId: number
    row: number
    col: number
    purchaseDate: Date
}

// Інтерфейс для координат місця
export interface SeatCoordinates {
    row: number
    col: number
}
