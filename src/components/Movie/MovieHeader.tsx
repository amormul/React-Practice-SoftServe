import {Avatar, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ProfileStatCard from "../Profile/ProfileStatCard.tsx";
import FilmDetailList from "./FilmDetailList.tsx";
import UserBio from "../Profile/UserBio.tsx";
import ReactPlayer from "react-player";

interface MovieHeaderProps {
  posterUrl: string
  trailerUrl: string
  title: string
  description: string
  releaseDate: string
  IMDbRating: number
  details: { name: string; description: string }[]
}

function MovieHeader({...props}: MovieHeaderProps) {
  const {posterUrl, trailerUrl, title, releaseDate, description, IMDbRating, details} = props
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      direction={{sm: 'column', md: 'row'}}
      justifyContent="space-between"
      gap={{xs: 2, md: 5}}
    >
      {/* Trailer */}
      <Grid size={12} sx={{ height: { xs: '200px', sm: '300px', md: '360px' } }}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=fsQgc9pCyDU"
          controls
          width="100%"
          height="100%"
        />
      </Grid>
      {/* Movie Details */}
      <Grid container size={{md: 7}}>
        <Stack
          direction="row"
          spacing={2}
          alignItems={{xs: 'center', md: 'flex-start'}}
          justifyContent="center"
          paddingBottom={{xs: 2, md: 0}}
        >
          <Stack spacing={1}>
            {isSmallScreen && (
              <Typography
                variant='h3'
                fontWeight='bold'
                textAlign="start"
                fontSize={{xs: '1.5rem', sm: '1.5rem', md: '2.0rem', lg: '2.4rem'}}
              >
                {title}
              </Typography>
            )}
            <Avatar
              src={posterUrl}
              alt={title}
              variant="square"
              sx={{
                width: {xs: 100, sm: 120, md: 150, lg: 180},
                height: {xs: 150, sm: 180, md: 225, lg: 270}
              }}
            />
            <Stack direction="column">
              <Button variant="contained">Обрати сеанс</Button>
              <Button variant="text">Додати в обраних</Button>
            </Stack>
          </Stack>
          <Stack alignItems="start" spacing={1}>
            {!isSmallScreen && (
              <Typography
                variant='h3'
                fontWeight='bold'
                textAlign="start"
                fontSize={{xs: '1.5rem', sm: '1.5rem', md: '2.0rem', lg: '2.4rem'}}
              >
                {title}
              </Typography>
            )}
            {!isSmallScreen && (
              <Typography
                variant="body1"
                fontSize={{xs: '0.8rem', sm: '0.9rem', md: '0.85rem', lg: '1.1rem'}}
                textAlign="left"
              >
                {description}
              </Typography>
            )}
          </Stack>
        </Stack>
        {isSmallScreen && <UserBio bio={description} maxWords={300}/>}
      </Grid>

      {/* Movie Statistics */}
      <Grid
        container
        spacing={2}
        size={{xs: 12, md: 4}}
      >
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="IMDb Рейтинг" value={IMDbRating} href="/movie/ratings"/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Рік" value={2025} href="*"/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Reviews" value={2} href="/movie/reviews"/>
        </Grid>
        <Grid size={{xs: 12}}>
          <FilmDetailList details={details} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieHeader;