// CinemaSeatSelector.tsx
import React, {useState} from "react";
import {Box, ButtonBase, IconButton} from "@mui/material";

/*
    '-' - немає місця фізичного, порожній простір
    'x' - заброньоване місце, недоступне для вибору
    'a' - доступне звичайне місце
    'b' - доступне vip місце
*/

type SeatType = "-" | "x" | "a" | "b";

// Клас для зберігання інформації про місце
class Seat {
    row: number;
    col: number;
    type: SeatType;

    constructor(row: number, col: number, type: SeatType) {
        this.row = row;
        this.col = col;
        this.type = type;
    }
}

// Текстова карта залу
const seatMapString =
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
    "-aaaaaaaaaaaa-";

// Парсер, що повертає масив масивів об'єктів Seat
// Тепер row логічно нумерується знизу вгору
const parseSeatMap = (mapStr: string): Seat[][] => {
    const lines = mapStr.split("\n");
    return lines.map((line, rowIndex) => {
        const row: Seat[] = [];
        let logicalCol = 0;
        // інвертуємо номер ряду
        const logicalRow = lines.length - 1 - rowIndex;

        line.trim().split("").forEach((char) => {
            if (char === "-") {
                row.push(new Seat(logicalRow, -1, char as SeatType));
            } else {
                row.push(new Seat(logicalRow, logicalCol, char as SeatType));
                logicalCol++;
            }
        });

        return row;
    });
};

// Статична карта, щоб екземпляри Seat були незмінні між рендерами
const seatMap: Seat[][] = parseSeatMap(seatMapString);

const CinemaSeatSelector: React.FC = () => {
    // Стан для вибраних місць (масив Seat)
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    // Перевіряємо, чи місце вже вибране
    const isSelected = (seat: Seat) =>
        selectedSeats.some(s => s.row === seat.row && s.col === seat.col);

    // Обробник кліку по місцю
    const handleSeatClick = (seat: Seat) => {
        if (seat.type === "-" || seat.type === "x") return;

        if (isSelected(seat)) {
            setSelectedSeats(prev =>
                prev.filter(s => !(s.row === seat.row && s.col === seat.col))
            );
        } else {
            setSelectedSeats(prev => [...prev, seat]);
        }
    };

    // Визначаємо колір місця
    const getSeatColor = (type: SeatType, selected: boolean) => {
        if (type === "-") return "transparent";
        if (type === "x") return "#d32f2f";
        if (selected) return "#fbc02d";
        if (type === "a") return "#4caf50";
        if (type === "b") return "#1976d2";
        return "grey";
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="start" gap={2}>
            {/* Лівий стовпчик з номерами рядів */}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" gap={1}>
                {seatMap.map((row) => (
                    <Box
                        key={`label-${row[0].row}`}
                        sx={{
                            width: 30,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            fontSize: "14px",
                            fontWeight: "bold",
                            lineHeight: "40px",
                        }}
                    >
                        {row[0].row + 1}
                    </Box>
                ))}
            </Box>

            {/* Сам селектор місць */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                {seatMap.map((row, rowIndex) => (
                    <Box key={rowIndex} display="flex" gap={1}>
                        {row.map(seat => {
                            const selected = isSelected(seat);
                            const color = getSeatColor(seat.type, selected);

                            if (seat.type === "-") {
                                return <Box key={`${seat.row}-${seat.col}`} width={40} height={40}/>;
                            }

                            return (
                                <ButtonBase
                                    key={`${seat.row}-${seat.col}`}
                                    onClick={() => handleSeatClick(seat)}
                                    disabled={seat.type === "x"}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: color,
                                        borderRadius: 2,
                                        border: "1px solid #333",
                                        transition: "background-color 0.3s, transform 0.1s",
                                        "&:hover": {
                                            backgroundColor:
                                                seat.type !== "x" ? "rgba(255, 255, 255, 0.2)" : undefined,
                                        },
                                        "&:active": {
                                            transform: "scale(0.95)",
                                        },
                                    }}
                                >
                                    {seat.col + 1}
                                </ButtonBase>
                            );
                        })}
                    </Box>
                ))}
            </Box>

            {/* Панель вибраних місць */}
            <Box
                minWidth={180}
                maxHeight={300}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p={2}
                border="1px solid #555"
                borderRadius={2}
                bgcolor="#1c1c1c"
                color="#fff"
            >
                <Box overflow="auto" flex={1} mb={2}>
                    {selectedSeats.length === 0 ? (
                        <Box fontStyle="italic" color="#aaa">Місця не вибрані</Box>
                    ) : (
                        selectedSeats.map((seat, idx) => {
                            const price = seat.type === "a" ? 100 : 150;
                            return (
                                <Box
                                    key={idx}
                                    mb={1}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <span>
                                        Ряд: {seat.row + 1}, Номер: {seat.col + 1}, {price} грн
                                    </span>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleSeatClick(seat)}
                                        sx={{
                                            color: "#ff5f5f",
                                            ml: 1,
                                            padding: 0.5,
                                        }}
                                    >
                                        ✖
                                    </IconButton>
                                </Box>
                            );
                        })
                    )}
                </Box>

                <Box fontWeight="bold" borderTop="1px solid #555" pt={1}>
                    Сума: {selectedSeats.reduce((sum, seat) => {
                    const price = seat.type === "a" ? 100 : 150;
                    return sum + price;
                }, 0)} грн
                </Box>
            </Box>
        </Box>
    );
};

export default CinemaSeatSelector;
