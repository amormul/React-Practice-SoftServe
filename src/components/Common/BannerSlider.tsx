import {Box, Button, Chip, Stack, Typography} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: false
  };

  return (
    <Slider {...settings} >
      {movies.map((movie, index) => (
        <Box
          key={index}
          sx={{
            height: '100vh',
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%), url(${movie.image})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 10%',
            position: 'relative',
            color: '#fff',
          }}
        >

          {/* Film Details */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 60,
              left: {md: 50},
              // right: {sm: 10},
              maxWidth: {xs: '100vw', md: "70%"},
              maxHeight: {xs: 'none', md: 500},
              p: {xs: 2, sm: 3, md: 2},
            }}
          >
            <Typography
              fontSize={{xs: "1.3rem", sm: "2rem", md: "2.6rem"}}
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

            <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center" mb={2}>
              <CalendarMonthIcon fontSize="small"/>
              <Typography>{movie.release}</Typography>
              <span>•</span>
              <AccessTimeIcon fontSize="small"/>
              <Typography>{movie.duration}</Typography>
              <span>•</span>
              <Typography>IMDb {movie.rating}</Typography>
            </Stack>

            <Typography display={{xs: "none", md: "flex"}} variant="body1" component="p" textAlign="left"
                        paddingBottom={2}>
              {movie.description}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                href="#"
                sx={{fontSize: {xs: '0.9rem', sm: '1rem', md: '1.5rem'}}}
                variant="contained"
                color="secondary"
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
        </Box>
      ))}
    </Slider>
  );
};

export default BannerSlider;