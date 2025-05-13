import type { ISession, SeatCoordinates } from "../types"

export class Session implements ISession {
    id: number
    hallId: number
    time: string
    movieTitle: string
    date: string
    reservedSeats: SeatCoordinates[]

    constructor(
        id: number,
        hallId: number,
        time: string,
        movieTitle: string,
        date: string,
        reservedSeats: SeatCoordinates[] = [],
    ) {
        this.id = id
        this.hallId = hallId
        this.time = time
        this.movieTitle = movieTitle
        this.date = date
        this.reservedSeats = reservedSeats
    }

    // Перевірка, чи місце заброньоване
    isSeatReserved(row: number, col: number): boolean {
        return this.reservedSeats.some((seat) => seat.row === row && seat.col === col)
    }

    // Додавання заброньованого місця
    addReservedSeat(row: number, col: number): void {
        if (!this.isSeatReserved(row, col)) {
            this.reservedSeats.push({ row, col })
        }
    }
}
