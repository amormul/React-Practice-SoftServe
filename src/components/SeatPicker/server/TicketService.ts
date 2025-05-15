import { Ticket } from "../model/Ticket"
import { ServerEmulator } from "./ServerEmulator"

export class TicketService {
    // Купівля квитків
    static async purchaseTickets(tickets: Ticket[]): Promise<boolean> {
        try {
            // Зберігаємо квитки на сервері
            const result = await ServerEmulator.saveTickets(tickets)

            // Зберігаємо квитки локально (наприклад, в localStorage)
            this.saveTicketsLocally(tickets)

            return result
        } catch (error) {
            console.error("Помилка при купівлі квитків:", error)
            throw error
        }
    }

    // Отримання квитків користувача
    static async getUserTickets(userId: string): Promise<Ticket[]> {
        try {
            // Отримуємо квитки з сервера
            const tickets = await ServerEmulator.getUserTickets(userId)

            // Можна також об'єднати з локально збереженими квитками
            const localTickets = this.getLocalTickets(userId)

            // Об'єднуємо квитки, уникаючи дублікатів
            const allTickets = [...tickets]

            for (const localTicket of localTickets) {
                if (!tickets.some((t) => t.id === localTicket.id)) {
                    allTickets.push(localTicket)
                }
            }

            return allTickets
        } catch (error) {
            console.error("Помилка при отриманні квитків:", error)
            throw error
        }
    }

    // Збереження квитків локально
    private static saveTicketsLocally(tickets: Ticket[]): void {
        try {
            // Отримуємо поточні квитки з localStorage
            const storedTickets = localStorage.getItem("userTickets")
            let userTickets: Ticket[] = storedTickets ? JSON.parse(storedTickets) : []

            // Додаємо нові квитки
            userTickets = [...userTickets, ...tickets]

            // Зберігаємо оновлений список
            localStorage.setItem("userTickets", JSON.stringify(userTickets))
        } catch (error) {
            console.error("Помилка при збереженні квитків локально:", error)
        }
    }

    // Отримання локально збережених квитків
    private static getLocalTickets(userId: string): Ticket[] {
        try {
            const storedTickets = localStorage.getItem("userTickets")
            if (!storedTickets) return []

            const tickets: Ticket[] = JSON.parse(storedTickets)

            // Фільтруємо квитки за userId
            return tickets
                .filter((ticket) => ticket.userId === userId)
                .map(
                    (ticket) =>
                        new Ticket(
                            ticket.id,
                            ticket.userId,
                            ticket.sessionId,
                            ticket.hallId,
                            ticket.row,
                            ticket.col,
                            new Date(ticket.purchaseDate),
                        ),
                )
        } catch (error) {
            console.error("Помилка при отриманні локальних квитків:", error)
            return []
        }
    }
}
