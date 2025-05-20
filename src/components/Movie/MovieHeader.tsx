import {Avatar, Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ProfileStatCard from "../Profile/ProfileStatCard.tsx";
import FilmDetailList from "./FilmDetailList.tsx";
import UserBio from "../Profile/UserBio.tsx";
import ReactPlayer from "react-player";
import {useState} from "react";
import FavoriteButton from "../FavoriteButton.tsx";

interface MovieHeaderProps {
  posterUrl: string
  trailerUrl: string
  title: string
  description: string
  releaseDate: string
  IMDbRating: number
  totalReviews: number
  details: { name: string; description: string }[]
}

function MovieHeader({...props}: MovieHeaderProps) {
  const {posterUrl, trailerUrl, title, releaseDate, description, IMDbRating, totalReviews, details} = props
  const theme = useTheme();
  const [showPlayer, setShowPlayer] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                {title}
              </Typography>
            )}
            <Box sx={{position: "relative", display: "inline-block"}}>
              <Avatar
                src={posterUrl}
                alt={title}
                variant="square"
                sx={{
                  width: {xs: 300, sm: 280, md: 150, lg: 200},
                  height: {xs: 460, sm: 420, md: 225, lg: 270}
                }}
              />
              <Box sx={{position: "absolute", top: 8, right: 8, zIndex: 1}}>
                <FavoriteButton title={title} posterUrl={posterUrl}/>
              </Box>
            </Box>
            <Button variant="contained" fullWidth>Обрати сеанс</Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{mt: 1}}
              onClick={() => setShowPlayer(true)}
            >
              Трейлер
            </Button>
            {showPlayer && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
                onClick={() => setShowPlayer(false)}
              >
                <ReactPlayer url={trailerUrl} playing controls/>
              </Box>
            )}
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
        sx={{maxHeight: '300px'}}
      >
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="IMDb" value={IMDbRating}/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Рік" value={releaseDate}/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Reviews" value={totalReviews}/>
        </Grid>
        <Grid size={{xs: 12}}>
          <FilmDetailList details={details}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieHeader;