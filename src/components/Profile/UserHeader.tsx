import {Avatar, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ProfileStatCard from "./ProfileStatCard.tsx";
import UserBio from "./UserBio.tsx";

interface UserHeaderProps {
  avatarUrl: string;
  dateJoined: string;
  username: string;
  bio: string;
}

function UserHeader({avatarUrl, dateJoined, username, bio}: UserHeaderProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      width={{ xs: '90%', sm: '90%', md: '850px', lg: '1000px', xl: '1200px' }}
      direction={{ sm: 'column', md: 'row' }}
      alignItems={{ sm: 'flex-start', md: 'flex-start' }}
      justifyContent={{ md: 'space-between'}}
      paddingTop={5}
    >
      {/* User */}
      <Grid container>
        <Stack
          direction="row"
          spacing={2}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          justifyContent="center"
          paddingBottom={{ xs: 2, md: 0 }}
        >
          <Avatar
            src={avatarUrl}
            alt={username}
            sx={{
              width: { xs: 65, sm: 70, md: 90, lg: 110 },
              height: { xs: 65, sm: 70, md: 90, lg: 110 }
            }}
          />
          <Stack
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography
              variant='h3'
              fontWeight='bold'
              fontSize={{ xs: '1.5rem', sm: '1.5rem', md: '2.0rem', lg: '2.4rem' }}
              color='#fff'
            >
              {username}
            </Typography>
            <Typography
              variant="body1"
              fontSize={{ xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.8rem' }}
            >
              {dateJoined}
            </Typography>
            {!isSmallScreen && <UserBio bio={bio} maxWords={20} />}
          </Stack>
        </Stack>
        {isSmallScreen && <UserBio bio={bio} maxWords={20} />}
      </Grid>

      {/* Cards Statistics */}
      <Grid
        container
        spacing={1}
        size={{xs: 12, md: 4}}
        paddingTop={1}
      >
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Ratings" value={15} href="/<user>/ratings"/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Watchlist" value={179} href="/<user>/watchlist"/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Reviews" value={3} href="/<user>/reviews"/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserHeader;
