import type {Ticket} from "../model/Ticket"
import type {Hall} from "../model/Hall"
import type {Session} from "../model/MovieSession"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.vfs

export class PDFService {
    static async generateQRCode(ticket: Ticket): Promise<string> {
        const QRCode = (await import("qrcode")).default
        const ticketData = JSON.stringify({
            id: ticket.id,
            userId: ticket.userId,
            hallId: ticket.hallId,
            sessionId: ticket.sessionId,
            row: ticket.row,
            col: ticket.col,
            purchaseDate: ticket.purchaseDate.toISOString(),
        })
        return QRCode.toDataURL(ticketData, {
            width: 200,
            margin: 5,
            color: {dark: "#000000", light: "#ffffff"},
        });
    }

    static async generateTicketPDF(ticket: Ticket, hall: Hall | undefined, session: Session | undefined): Promise<Blob> {
        const qrCodeDataUrl = await this.generateQRCode(ticket)

        const docDefinition: any = {
            pageSize: "A5",
            pageMargins: [20, 20],
            content: [
                {
                    text: "Наш кінотеатр",
                    style: "header",
                    alignment: "center",
                },
                {
                    text: "Квиток",
                    style: "header",
                    alignment: "center",
                },
                {
                    text: session?.movieTitle || "Назва фільму недоступна",
                    style: "movieTitle",
                    alignment: "center",
                    margin: [0, 10]
                },
                {
                    style: "ticketDetails",
                    margin: [0, 10],
                    columns: [
                        {
                            width: "*",
                            stack: [
                                {text: "Деталі сеансу:", style: "sectionHeader"},
                                {text: `Дата: ${session?.date || "Н/Д"}`},
                                {text: `Час: ${session?.time || "Н/Д"}`},
                                {text: `Зал: ${hall?.name || "Н/Д"}`},
                            ],
                        },
                        {
                            width: "*",
                            stack: [
                                {text: "Місце:", style: "sectionHeader"},
                                {text: `Ряд: ${ticket.row + 1}`},
                                {text: `Місце: ${ticket.col + 1}`},
                            ],
                        },
                    ],
                },
                {
                    text: "Інформація про квиток:",
                    style: "sectionHeader",
                    margin: [0, 10, 0, 2],
                },
                {
                    ul: [
                        `Номер квитка: ${ticket.id.toString().slice(-8)}`,
                        `Дата покупки: ${ticket.purchaseDate.toLocaleString()}`,
                    ],
                },
                {
                    image: qrCodeDataUrl,
                    width: 120,
                    alignment: "center",
                    margin: [0, 20, 0, 10],
                },
                {
                    text: "Цей QR-код містить всю інформацію про ваш квиток. Покажіть його при вході до кінозалу.",
                    fontSize: 8,
                    alignment: "center",
                    margin: [0, 0, 0, 10],
                },
                {
                    text: "© 2025 Кінотеатр. Всі права захищені.",
                    fontSize: 8,
                    alignment: "center",
                    absolutePosition: {x: 0, y: 535},
                },
            ],
            defaultStyle: {
                font: "Roboto",
                fontSize: 10,
            },
            styles: {
                header: {fontSize: 20, bold: true, color: "#080434"},
                subheader: {fontSize: 12, color: "#ffffff"},
                movieTitle: {fontSize: 16, bold: true},
                sectionHeader: {bold: true, margin: [0, 5, 0, 2]},
                ticketDetails: {columnGap: 20},
            },
        }

        return new Promise((resolve) => {
            pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => resolve(blob))
        })
    }

    static async downloadTicketPDF(ticket: Ticket, hall: Hall | undefined, session: Session | undefined): Promise<void> {
        const pdfBlob = await this.generateTicketPDF(ticket, hall, session)
        const url = URL.createObjectURL(pdfBlob)

        const link = document.createElement("a")
        link.href = url
        link.download = `ticket-${ticket.id.toString().slice(-8)}.pdf`
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        setTimeout(() => URL.revokeObjectURL(url), 100)
    }
}
