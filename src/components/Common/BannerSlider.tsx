import {Box, Button, Chip, Stack, Typography} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Slider from 'react-slick';
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {MovieContext} from '../../context/MovieProvider';
import {truncateText} from "../../utils.ts";
import FavoriteButton from "../FavoriteButton.tsx";

const BannerSlider = () => {
  const {movies} = useContext(MovieContext) || {movies: []};
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

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
    beforeChange: (_current: never, next: number) => setActiveSlide(() => next),
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
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {/* Film Details */}
          <Box
            sx={{
              position: 'absolute',
              width: {xs: '100%', md: '80%', lg: '55%'},
              bottom: {xs: '8%', sm: 30, md: 10},
              padding: {xs: 2, sm: 5, md: 6, lg: 10},
              zIndex: 10,
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
                    opacity: 0.9,
                    fontWeight: 'bold'
                  }}
                />
              ))}
            </Stack>

            <Stack direction="row" spacing={{xs: 0.6, md: 1}} alignItems="center" mb={2}>
              <CalendarMonthIcon fontSize="small"/>
              <Typography>{movie.releaseDate}</Typography>
              <span>•</span>
              <AccessTimeIcon fontSize="small"/>
              <Typography>{movie.duration}</Typography>
              <span>•</span>
              <Typography>IMDb {movie.IMDbRating}</Typography>
            </Stack>

            <Typography
              display={{xs: "none", md: "flex"}}
              variant="body1"
              component="p"
              textAlign="left"
              paddingBottom={2}
            >
              {truncateText(movie.description, 200)}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to={`/sessions?film=${encodeURIComponent(movie.title)}`}
                sx={{fontSize: {xs: '1.2rem', sm: '1.4rem', md: '1.6rem'}}}
                variant="contained"
                size="large"
                color="primary"
                startIcon={<CalendarMonthIcon/>}
              >
                Обрати сеанс
              </Button>
              <FavoriteButton
                title={movie.title}
                posterUrl={movie.posterUrl}
              />
            </Stack>
          </Box>

          {/* Background Image */}
          <Box
            key={index}
            onClick={() => navigate(`/movie/${movie.title}`)}
            sx={{
              height: '100vh',
              backgroundImage: `linear-gradient(to top, rgba(23,23,23,9) 10%, rgba(23,23,23,0.35) 40%, rgba(23,23,23,0) 70%), url(${movie.posterUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: '50% 10%',
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