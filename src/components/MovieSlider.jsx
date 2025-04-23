import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const movies = [
    {
        title: 'Avatar: The Way of Water',
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        release: '2022',
        duration: '3h 12m',
        rating: '8.5',
        description: 'More than a decade after the events of the first film, the Sully family faces new challenges.',
        image: 'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
    },
    {
        title: 'A Minecraft Movie',
        genres: ['Action', 'Comedy', 'Adventure'],
        release: '2025',
        duration: '1h 41m',
        rating: '5.9',
        description: 'Four misfits are pulled into a cubic world and must master its rules to return home.',
        image: 'https://www.forbes.com.au/wp-content/uploads/2025/04/0x0.jpg-72.webp'
    },
    {
        title: 'Dune: Part Two',
        genres: ['Sci-Fi', 'Adventure'],
        release: '2024',
        duration: '2h 46m',
        rating: '8.7',
        description: 'Paul Atreides unites with the Fremen and seeks revenge against enemies.',
        image: 'https://image.tmdb.org/t/p/original/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg'
    }
];

const MovieSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,

        customPaging: i => (
            <div
                style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    opacity: 0.5
                }}
            />
        ),
        appendDots: dots => (
            <div
                style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <ul
                    style={{
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        gap: '8px',
                        listStyle: 'none'
                    }}
                >
                    {dots.map((dot, index) => {
                        const isActive = dot.props.className.includes('slick-active');
                        return (
                            <li key={index}>
                                <div
                                    style={{
                                        width:'12px',
                                        height:'12px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        opacity: isActive ? 1 : 0.5,
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1
            }}
        >
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: '100vh',
                            backgroundImage: `url(${movie.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: '#fff',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 50,
                                top: 400,
                                left: 80,
                                bgcolor: 'rgba(0,0,0,0)',
                                p: 4,
                                borderRadius: 2,
                                maxWidth: 700,
                                maxHeight: 500
                            }}
                        >
                            <Typography variant="h3" gutterBottom fontWeight="bold">
                                {movie.title}
                            </Typography>

                            <Stack direction="row" spacing={1} mb={2}>
                                {movie.genres.map((genre, i) => (
                                    <Chip
                                        key={i}
                                        label={genre}
                                        sx={{
                                            backgroundColor: '#fff',
                                            opacity: 0.9,
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                <CalendarMonthIcon fontSize="small" />
                                <Typography>{movie.release}</Typography>
                                <AccessTimeIcon fontSize="small" />
                                <Typography>{movie.duration}</Typography>
                                <Typography>{movie.rating}</Typography>
                            </Stack>

                            <Typography variant="body1" paragraph>
                                {movie.description}
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    href="#"
                                    variant="contained"
                                    color="error"
                                    startIcon={<PlayArrowIcon />}
                                >
                                    Watch Now
                                </Button>
                                <Button
                                    href="#"
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        color: 'white',
                                        borderColor: 'red',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            borderColor: 'white'
                                        }
                                    }}
                                >
                                    Watch Later
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default MovieSlider;