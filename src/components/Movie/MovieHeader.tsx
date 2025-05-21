import {Avatar, Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ProfileStatCard from "../Profile/ProfileStatCard.tsx";
import {Api} from "../api/config.ts"
import {useNavigate} from "react-router-dom";

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
  const posterUrl = Api.IMAGES_MOVIES + "/" + movie.id
  const navigate = useNavigate();

  const handleSelectSession = () => {
    navigate(`/buy_tickets?movieId=${movie.id}`);
  };
  
  return (
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={4}
        direction={{ xs: 'column', md: 'row' }}
      >
        {/* Left Side - Movie Poster */}
        <Grid item xs={12} md={4} lg={3}>
          <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Avatar
              src={posterUrl}
              alt={movie.title}
              variant="rounded"
              sx={{
                width: { xs: 300, sm: 320, md: "100%", lg: "100%" },
                height: { xs: 450, sm: 480, md: 450, lg: 500 },
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)'
              }}
            />
            <Button 
              variant="contained" 
              fullWidth
              size="large"
              onClick={handleSelectSession}
              sx={{ mt: 2 }}
            >
              Обрати сеанс
            </Button>
          </Box>
        </Grid>

        {/* Right Side - Movie Details */}
        <Grid item xs={12} md={8} lg={9}>
          <Stack spacing={3}>
            {/* Title and Director */}
            <Box>
              <Typography
                variant='h3'
                fontWeight='bold'
                textAlign="left"
                fontSize={{xs: '1.8rem', sm: '2rem', md: '2.2rem', lg: '2.6rem'}}
                mb={1}
              >
                {movie.title}
              </Typography>
              
              {movie.director && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontSize={{xs: '1rem', md: '1.1rem'}}
                >
                  Режисер: {movie.director.name}
                </Typography>
              )}
            </Box>

            {/* Movie Statistics */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <ProfileStatCard title="IMDb" value={movie.rating}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <ProfileStatCard title="Рік" value={movie.year}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <ProfileStatCard title="Тривалість" value={`${movie.duration} хв.`}/>
              </Grid>
            </Grid>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Жанри:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {movie.genres.map(genre => (
                    <Box 
                      key={genre.id} 
                      sx={{ 
                        p: "4px 12px", 
                        borderRadius: "16px", 
                        backgroundColor: "rgba(255, 0, 0, 0.08)", 
                        mb: 1 
                      }}
                    >
                      <Typography variant="body2">{genre.name}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Description */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Опис:
              </Typography>
              <Typography
                variant="body1"
                fontSize={{xs: '0.9rem', md: '1rem'}}
                textAlign="left"
                sx={{ lineHeight: 1.6 }}
              >
                {movie.description}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MovieHeader;