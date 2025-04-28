import React, {useState} from "react";
import {Box, ButtonBase} from "@mui/material";

/*
    '-' - немає місця фізичного, порожній простір
    'x' - заброньоване місце, недоступне для вибору
    'a' - доступне звичайне місце
    'b' - доступне преміум місце
 */
type SeatType = "-" | "x" | "a" | "b";

const seatMapString = `
--aa--axxb--
aaabba-
aaxxbbaa
a-aabb--`

const parseSeatMap = (mapStr: string): SeatType[][] => {
    return mapStr.split("\n").map((line) => line.trim().split("") as SeatType[]);
};
const CinemaSeatSelector: React.FC = () => {
    // Отримуємо масив масивів місць
    const seatMap = parseSeatMap(seatMapString);

    // Стан для вибраних місць (масив об'єктів {row, col})
    const [selectedSeats, setSelectedSeats] = useState<{ row: number; col: number }[]>([]);

    // Перевіряємо, чи вибране місце
    const isSelected = (row: number, col: number) =>
        selectedSeats.some((seat) => seat.row === row && seat.col === col);

    // Клік по місцю
    const handleSeatClick = (row: number, col: number, seatType: SeatType) => {
        // Якщо місця нема або воно зайняте — нічого не робимо
        if (seatType === "-" || seatType === "x") return;

        const alreadySelected = isSelected(row, col);

        if (alreadySelected) {
            // Якщо місце вже вибране — знімаємо вибір
            setSelectedSeats((prev) =>
                prev.filter((seat) => !(seat.row === row && seat.col === col))
            );
        } else {
            // Якщо не вибране — додаємо
            setSelectedSeats((prev) => [...prev, { row, col }]);
        }
    };

    // Визначаємо колір місця за його типом і чи воно вибране
    const getSeatColor = (seatType: SeatType, selected: boolean) => {
        if (seatType === "-") return "transparent"; // пусто
        if (seatType === "x") return "#d32f2f"; // червоне — зайняте
        if (selected) return "#fbc02d"; // жовте — вибране
        if (seatType === "a") return "#4caf50"; // зелене — звичайне
        if (seatType === "b") return "#1976d2"; // синє — преміум
        return "grey"; // запасний варіант
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            {/* Малюємо рядки місць */}
            {seatMap.map((row, rowIndex) => (
                <Box key={rowIndex} display="flex" gap={1}>
                    {/* Малюємо місця в кожному рядку */}
                    {row.map((seatType, colIndex) => {
                        const selected = isSelected(rowIndex, colIndex);
                        const color = getSeatColor(seatType, selected);

                        if (seatType === "-") {
                            // Якщо місце "-" — просто порожній простір
                            return <Box key={colIndex} width={40} height={40} />;
                        }

                        return (
                            <ButtonBase
                                key={colIndex}
                                onClick={() => handleSeatClick(rowIndex, colIndex, seatType)}
                                disabled={seatType === "x"} // Зайняті місця не натискаються
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: color,
                                    borderRadius: 2,
                                    border: "1px solid #333",
                                    transition: "background-color 0.3s, transform 0.1s",
                                    "&:hover": {
                                        backgroundColor:
                                            seatType !== "x" ? "rgba(255, 255, 255, 0.2)" : undefined,
                                    },
                                    "&:active": {
                                        transform: "scale(0.95)", // Анімація натискання
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
};

export default CinemaSeatSelector;