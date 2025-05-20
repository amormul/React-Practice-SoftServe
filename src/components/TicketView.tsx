import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    CircularProgress
} from "@mui/material";
import  {Api} from "./api/config"
import { PDFService } from "./PdfComponent/PDFService";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {Ticket} from "./PdfComponent/Ticket.ts";


const TicketView: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(Api.TICKETS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if(response.status == 401)
                {
                    localStorage.removeItem('token')
                    window.location.href = '/tickets'
                }

                const data = await response.json();
                setTickets(data || []);
            } catch (error) {
                console.error("Помилка:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleDownload = async (ticket: Ticket) => {
        await PDFService.downloadTicketPDF(ticket);
    };

    const handleValidate = async (ticket: Ticket) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(Api.TICKETS_CHECK, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(ticket)
            });

            if(response.status == 401)
            {
                localStorage.removeItem('token')
                window.location.href = '/tickets'
            }
            if(response.ok)
                alert("Квиток дійсний!")
            else alert((await response.json())["message"]);
        } catch (error) {
            console.error("Помилка:", error);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Grid container spacing={3}>
            {tickets.map((ticket) => (
                <Grid item xs={12} md={6} key={ticket.ticket_id}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">{ticket.movie_title}</Typography>
                            <Typography>Зал: {ticket.hall_id}</Typography>
                            <Typography>Дата: {new Date(ticket.time).toLocaleString()}</Typography>
                            <Typography>Ряд: {ticket.row + 1}, Місце: {ticket.col + 1}</Typography>
                            <Typography>Ціна: {ticket.price}₴</Typography>
                            <Typography>Покупець: {ticket.username}</Typography>

                            <Grid container spacing={1} mt={2}>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PictureAsPdfIcon />}
                                        onClick={() => handleDownload(ticket)}
                                    >
                                        Завантажити PDF
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckCircleOutlineIcon />}
                                        onClick={() => handleValidate(ticket)}
                                    >
                                        Перевірити
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default TicketView;
