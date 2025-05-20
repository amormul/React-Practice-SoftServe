import { Hall } from "../model/Hall"
import { Session } from "../model/MovieSession"
import { Seat } from "../model/Seat"
import type { Ticket } from "../model/Ticket"
import type { SeatType } from "../types"

// Клас для емуляції серверних запитів
export class ServerEmulator {
    // Зберігання даних
    private static halls: Hall[] = [
        new Hall(
            1,
            "Зал 1",
            "--bb--bb--bb--\n" +
            "--aaaaaaaaaa--\n" +
            "-aa-b-aa-b-aa-\n" +
            "aaaaaaaaaaaaaa\n" +
            "aaaaaaaaaaaaaa\n" +
            "aa-bb-aa-bb-aa\n" +
            "a-bbbbaabbbb-a\n" +
            "aa-bb-aa-bb-aa\n" +
            "aaaaaaaaaaaaaa\n" +
            "-aaaaaaaaaaaa-\n" +
            "-aaaaaaaaaaaa-\n" +
            "-aaaaaaaaaaaa-",
        ),
        new Hall(
            2,
            "Зал 2",
            "----bb----\n" +
            "--aaaaaa--\n" +
            "-aaaaaaaa-\n" +
            "aaaaaaaaaa\n" +
            "aaaaaaaaaa\n" +
            "aaaaaaaaaa\n" +
            "-aaaaaaaa-\n" +
            "--aaaaaa--",
        ),
    ]

    private static sessions: Session[] = [
        new Session(1, 1, "10:00", "Аватар 2", "2023-05-15", [
            { row: 5, col: 5 },
            { row: 5, col: 6 },
        ]),
        new Session(2, 1, "13:00", "Аватар 2", "2023-05-15", [
            { row: 3, col: 3 },
            { row: 3, col: 4 },
        ]),
        new Session(3, 2, "11:30", "Месники", "2023-05-15", [
            { row: 2, col: 2 },
            { row: 2, col: 3 },
        ]),
    ]

    private static tickets: Ticket[] = []

    // Зберігання використаних квитків (для перевірки повторного використання)
    private static usedTickets: Set<string | number> = new Set()

    // Отримання списку залів
    static getHalls(): Hall[] {
        return [...this.halls]
    }

    // Отримання списку сеансів
    static getSessions(): Session[] {
        return [...this.sessions]
    }

    // Отримання карти місць для конкретного залу та сеансу
    static async getSeatMap(hallId: number, sessionId: number): Promise<Seat[][]> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 300))

        const hall = this.halls.find((h) => h.id === hallId)
        if (!hall) {
            throw new Error(`Зал з ID ${hallId} не знайдено`)
        }

        const session = this.sessions.find((s) => s.id === sessionId)
        if (!session) {
            throw new Error(`Сеанс з ID ${sessionId} не знайдено`)
        }

        // Отримуємо всі квитки для цього сеансу
        const sessionTickets = this.tickets.filter((ticket) => ticket.sessionId === sessionId && ticket.hallId === hallId)

        // Додаємо заброньовані місця з квитків
        const reservedSeats = [...session.reservedSeats]
        sessionTickets.forEach((ticket) => {
            if (!reservedSeats.some((seat) => seat.row === ticket.row && seat.col === ticket.col)) {
                reservedSeats.push({ row: ticket.row, col: ticket.col })
            }
        })

        // Парсимо карту місць
        return this.parseSeatMap(hall.seatMapTemplate, hallId, sessionId, reservedSeats)
    }

    // Парсер карти місць
    private static parseSeatMap(
        mapStr: string,
        hallId: number,
        sessionId: number,
        reservedSeats: { row: number; col: number }[],
    ): Seat[][] {
        const lines = mapStr.split("\n")
        return lines.map((line, rowIndex) => {
            const row: Seat[] = []
            let logicalCol = 0
            // інвертуємо номер ряду
            const logicalRow = lines.length - 1 - rowIndex

            line
                .trim()
                .split("")
                .forEach((char) => {
                    if (char === "-") {
                        row.push(new Seat(logicalRow, -1, char as SeatType, hallId, sessionId))
                    } else {
                        // Перевіряємо, чи місце заброньоване для цього сеансу
                        const isReserved = reservedSeats.some((seat) => seat.row === logicalRow && seat.col === logicalCol)

                        // Якщо місце заброньоване, змінюємо тип на "x"
                        const seatType = isReserved ? "x" : (char as SeatType)

                        row.push(new Seat(logicalRow, logicalCol, seatType, hallId, sessionId))
                        logicalCol++
                    }
                })

            return row
        })
    }

    // Збереження квитків
    static async saveTickets(tickets: Ticket[]): Promise<boolean> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Перевірка, чи всі місця доступні
        for (const ticket of tickets) {
            const session = this.sessions.find((s) => s.id === ticket.sessionId)
            if (!session) {
                throw new Error(`Сеанс з ID ${ticket.sessionId} не знайдено`)
            }

            // Перевірка, чи місце вже заброньоване
            if (session.isSeatReserved(ticket.row, ticket.col)) {
                throw new Error(`Місце (ряд ${ticket.row + 1}, місце ${ticket.col + 1}) вже заброньоване`)
            }

            // Перевірка, чи є квиток на це місце
            const existingTicket = this.tickets.find(
                (t) =>
                    t.sessionId === ticket.sessionId &&
                    t.hallId === ticket.hallId &&
                    t.row === ticket.row &&
                    t.col === ticket.col,
            )

            if (existingTicket) {
                throw new Error(`Місце (ряд ${ticket.row + 1}, місце ${ticket.col + 1}) вже продано`)
            }
        }

        // Додаємо квитки
        this.tickets.push(...tickets)

        // Оновлюємо заброньовані місця в сеансах
        for (const ticket of tickets) {
            const session = this.sessions.find((s) => s.id === ticket.sessionId)
            if (session) {
                session.addReservedSeat(ticket.row, ticket.col)
            }
        }

        return true
    }

    // Отримання квитків користувача
    static async getUserTickets(userId: string): Promise<Ticket[]> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 300))

        return this.tickets.filter((ticket) => ticket.userId === userId)
    }

    // Отримання всіх квитків (для адміністратора)
    static async getAllTickets(): Promise<Ticket[]> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [...this.tickets]
    }

    // Перевірка валідності квитка
    static async validateTicket(ticketData: string): Promise<{
        valid: boolean
        used: boolean
        ticket?: Ticket
        hall?: Hall
        session?: Session
        message: string
    }> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 500))

        try {
            // Парсимо дані квитка з QR-коду
            const data = JSON.parse(ticketData)

            // Перевіряємо наявність необхідних полів
            if (
                !data.id ||
                data.hallId === undefined ||
                data.sessionId === undefined ||
                data.row === undefined ||
                data.col === undefined
            ) {
                return {
                    valid: false,
                    used: false,
                    message: "Недійсний формат квитка",
                }
            }

            // Перевіряємо, чи квиток вже використаний
            if (this.usedTickets.has(data.id)) {
                return {
                    valid: true,
                    used: true,
                    message: "Квиток вже використаний",
                }
            }

            // Шукаємо квиток у базі даних
            const ticket = this.tickets.find((t) => t.id.toString() === data.id.toString())

            if (!ticket) {
                return {
                    valid: false,
                    used: false,
                    message: "Квиток не знайдено в базі даних",
                }
            }

            // Перевіряємо відповідність даних
            if (
                ticket.hallId !== data.hallId ||
                ticket.sessionId !== data.sessionId ||
                ticket.row !== data.row ||
                ticket.col !== data.col
            ) {
                return {
                    valid: false,
                    used: false,
                    message: "Дані квитка не відповідають збереженим даним",
                }
            }

            // Отримуємо інформацію про зал і сеанс
            const hall = this.halls.find((h) => h.id === ticket.hallId)
            const session = this.sessions.find((s) => s.id === ticket.sessionId)

            return {
                valid: true,
                used: false,
                ticket,
                hall,
                session,
                message: "Квиток дійсний",
            }
        } catch (error) {
            return {
                valid: false,
                used: false,
                message: "Помилка при перевірці квитка: " + (error instanceof Error ? error.message : String(error)),
            }
        }
    }

    // Позначення квитка як використаного
    static async markTicketAsUsed(ticketId: string | number): Promise<boolean> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Перевіряємо, чи квиток існує
        const ticket = this.tickets.find((t) => t.id.toString() === ticketId.toString())

        if (!ticket) {
            throw new Error("Квиток не знайдено")
        }

        // Додаємо квиток до списку використаних
        this.usedTickets.add(ticketId)

        return true
    }

    // Отримання списку використаних квитків
    static async getUsedTickets(): Promise<(string | number)[]> {
        // Емуляція затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 300))

        return Array.from(this.usedTickets)
    }
}
