import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../../context/MovieProvider";
import { truncateText } from "../../utils.ts";
import { Api } from "../api/config";
import { useAuth } from "../../context/AuthProvider";

const BannerSlider: React.FC = () => {
    const { movies } = useContext(MovieContext) || { movies: [] };
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setActiveSlide(0);
    }, [movies]);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        pauseOnHover: false,
        beforeChange: (_current: number, next: number) => setActiveSlide(next),
        customPaging: (i: number) => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: activeSlide === i ? "#FF0000" : "#FFFFFF",
                    margin: "0 5px",
                    cursor: "pointer",
                }}
            />
        ),
        appendDots: (dots: React.ReactNode) => (
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {dots}
            </div>
        ),
    };

    const handleSelectSession = (movieId: number) => {
        const back = encodeURIComponent(`/buy_tickets?movieId=${movieId}`);
        if (isAuthenticated) {
            navigate(`/buy_tickets?movieId=${movieId}`);
        } else {
            navigate(`/login?back=${back}`);
        }
    };

    return (
        <Slider {...settings}>
            {movies.map((movie, index) => (
                <Box
                    key={movie.id}
                    sx={{
                        position: "relative",
                        height: "100vh",
                        color: "inherit",
                        cursor: "pointer",
                    }}
                >
                    {/* Деталі фільму */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: { xs: "100%", md: "80%", lg: "55%" },
                            bottom: { xs: "8%", sm: 30, md: 10 },
                            p: { xs: 2, sm: 5, md: 6, lg: 10 },
                            zIndex: 10,
                        }}
                    >
                        <Typography
                            component="h3"
                            fontWeight="bold"
                            gutterBottom
                            fontSize={{ xs: "1.65rem", sm: "2rem", md: "2.7rem" }}
                        >
                            {movie.title}
                        </Typography>

                        <Stack direction="row" spacing={1} mb={2}>
                            {movie.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name} sx={{ opacity: 0.9, fontWeight: "bold" }} />
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={{ xs: 0.6, md: 1 }} alignItems="center" mb={2}>
                            <CalendarMonthIcon fontSize="small" />
                            <Typography>{movie.year}</Typography>
                            <span>•</span>
                            <AccessTimeIcon fontSize="small" />
                            <Typography>{movie.duration}</Typography>
                            <span>•</span>
                            <Typography>IMDb {movie.rating}</Typography>
                        </Stack>

                        <Typography
                            variant="body1"
                            component="p"
                            textAlign="left"
                            display={{ xs: "none", md: "block" }}
                            pb={2}
                        >
                            {truncateText(movie.description, 200)}
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Button
                                onClick={() => handleSelectSession(movie.id)}
                                variant="contained"
                                size="large"
                                startIcon={<CalendarMonthIcon />}
                                sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" } }}
                            >
                                Обрати сеанс
                            </Button>
                        </Stack>
                    </Box>

                    {/* Фонове зображення */}
                    <Box
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        sx={{
                            height: "100vh",
                            backgroundImage: `linear-gradient(to top, rgba(23,23,23,0.9) 10%, rgba(23,23,23,0.35) 40%, rgba(23,23,23,0) 70%), 
                url(${Api.IMAGES_MOVIES}/${movie.id})`,
                            backgroundSize: "cover",
                            backgroundPosition: "50% 10%",
                            transform: activeSlide === index ? "scale(1.1)" : "scale(1)",
                            transition: activeSlide === index ? "transform 10s ease-in-out" : "none",
                        }}
                    />
                </Box>
            ))}
        </Slider>
    );
};

export default BannerSlider;
