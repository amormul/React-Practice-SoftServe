import {Box, Button, Chip, Stack, Typography} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Slider from 'react-slick';
import React, {SetStateAction, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

const movies = [
  {
    title: 'Avatar: The Way of Water',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    release: '2022',
    duration: '3h 12m',
    rating: '8.5',
    description: 'More than a decade after the events of the first film, the Sully family faces new challenges. Decade after the events of the first film',
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

const BannerSlider = () => {
  const [activeSlide, setActiveSlide] = useState(-1);

  useEffect(() => {
    setActiveSlide(0);
  }, []);

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
    beforeChange: (_current: never, next: SetStateAction<number>) => setActiveSlide(next),
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

  return (
    <Slider {...settings} >
      {movies.map((movie, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            height: '100vh',
          }}
        >
          {/* Film Details */}
          <Box
            sx={{
              position: 'absolute',
              width: {xs: '100%', md: '80%', lg: '55%'},
              left: 0,
              bottom: {xs: '10%', sm: 30, md: 10},
              zIndex: 10,
              padding: {xs: 2, sm: 5, md: 6, lg: 10},
            }}
          >
            <Typography
              fontSize={{xs: "1.65rem", sm: "2rem", md: "2.7rem"}}
              component="h3"
              gutterBottom
              fontWeight="bold"
              textAlign="left"
            >
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

            <Stack direction="row" spacing={{xs: 0.6, md: 1}} alignItems="center" mb={2}>
              <CalendarMonthIcon fontSize="small"/>
              <Typography>{movie.release}</Typography>
              <span>•</span>
              <AccessTimeIcon fontSize="small"/>
              <Typography>{movie.duration}</Typography>
              <span>•</span>
              <Typography>IMDb {movie.rating}</Typography>
            </Stack>

            <Typography
              display={{xs: "none", md: "flex"}}
              variant="body1"
              component="p"
              textAlign="left"
              paddingBottom={2}
            >
              {movie.description}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to={`/sessions?film=${encodeURIComponent(movie.title)}`}
                sx={{fontSize: {xs: '0.97rem', sm: '1.2rem', md: '1.5rem'}}}
                variant="contained"
                size="large"
                color="primary"
                startIcon={<CalendarMonthIcon/>}
              >
                Обрати сеанс
              </Button>
              <Button
                href="#"
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'red',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                В обраних
              </Button>
            </Stack>
          </Box>

          {/* Background Image */}
          <Box
            key={index}
            sx={{
              height: '100%',
              backgroundImage: `linear-gradient(to top, rgba(23,23,23,9) 10%, rgba(23,23,23,0.35) 40%, rgba(23,23,23,0) 70%), url(${movie.image})`,
              backgroundSize: 'cover',
              backgroundPosition: '50% 10%',
              position: 'relative',
              color: '#fff',
              transition: activeSlide === index ? 'transform 10s ease-in-out' : 'none',
              transform: activeSlide === index ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default BannerSlider;