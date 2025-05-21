import {Avatar, Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ProfileStatCard from "../Profile/ProfileStatCard.tsx";
import UserBio from "../Profile/UserBio.tsx";
import {Api} from "../api/config.ts"
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  rating: number;
  year: number;
  director: { id: number; name: string } | null;
  genres: { id: number; name: string }[];
  actors: { id: number; name: string; char_name: string }[];
}

function MovieHeader({...movie}: Movie) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const posterUrl = Api.IMAGES_MOVIES +"/" + movie.id
  const navigate = useNavigate();

  const handleSelectSession = () => {
    navigate(`/buy_tickets?movieId=${movie.id}`);
  };
  
  return (
    <Grid
      container
      direction={{sm: 'column', md: 'row'}}
      justifyContent="space-between"
      gap={{xs: 2, md: 4}}
    >
      {/* Movie Details */}
      <Grid
        container
        size={{md: 7}}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="row"
          spacing={{xs: 0, md: 3}}
          paddingBottom={{xs: 3, md: 0}}
        >
          <Stack spacing={2} alignItems="center">
            {isSmallScreen && (
              <Typography
                variant='h1'
                textAlign="start"
                fontSize={{xs: '1.7rem', sm: '1.9rem', md: '2.1rem', lg: '2.4rem'}}
              >
                {movie.title}
              </Typography>
            )}
            <Box sx={{position: "relative", display: "inline-block"}}>
              <Avatar
                src={posterUrl}
                alt={movie.title}
                variant="square"
                sx={{
                  width: {xs: 300, sm: 280, md: 150, lg: 200},
                  height: {xs: 460, sm: 420, md: 225, lg: 270}
                }}
              />
            </Box>
            <Button 
              variant="contained" 
              fullWidth
              onClick={handleSelectSession}
            >
              Обрати сеанс
            </Button>
          </Stack>
          <Stack alignItems="start" spacing={1}>
            {!isSmallScreen && (
              <Typography
                variant='h3'
                fontWeight='bold'
                textAlign="start"
                fontSize={{xs: '1.5rem', sm: '1.5rem', md: '2.0rem', lg: '2.4rem'}}
              >
                {movie.title}
              </Typography>
            )}
            {!isSmallScreen && (
              <Typography
                variant="body1"
                fontSize={{xs: '0.8rem', sm: '0.9rem', md: '0.85rem', lg: '1.1rem'}}
                textAlign="left"
              >
                {movie.description}
              </Typography>
            )}
          </Stack>
        </Stack>
        {isSmallScreen && <UserBio bio={movie.description} maxWords={300}/>}
      </Grid>

      {/* Movie Statistics */}
      <Grid
        container
        spacing={2}
        size={{xs: 12, md: 4}}
        sx={{maxHeight: '300px'}}
      >
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="IMDb" value={movie.rating}/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Рік" value={movie.year}/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Reviews" value={4}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieHeader;