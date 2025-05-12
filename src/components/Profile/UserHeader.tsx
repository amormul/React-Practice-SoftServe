import {Avatar, Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ProfileStatCard from "./ProfileStatCard.tsx";
import UserBio from "./UserBio.tsx";
import {DateRangeOutlined} from "@mui/icons-material";

interface UserHeaderProps {
  avatarUrl: string;
  dateJoined: string;
  username: string;
  bio: string;
  isOwner: boolean;
  statistics: {
    ratings: number;
    watchlist: number;
    reviews: number;
  };
}

function UserHeader({avatarUrl, username, dateJoined, bio, isOwner, statistics}: UserHeaderProps) {
  const theme = useTheme();
  // const navigate = useNavigate()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleEditClick = () => {
    // navigate('/settings');
  };

  return (
    <Grid
      container
      direction={{sm: 'column', md: 'row'}}
      justifyContent="space-between"
      gap={{md: 10}}
    >
      {/* User */}
      <Grid container>
        <Stack
          direction="row"
          spacing={2}
          alignItems={{xs: 'center', md: 'flex-start'}}
          justifyContent="center"
          paddingBottom={{xs: 2, md: 0}}
        >
          <Avatar
            src={avatarUrl}
            alt={username}
            sx={{
              width: {xs: 65, sm: 70, md: 90, lg: 110},
              height: {xs: 65, sm: 70, md: 90, lg: 110}
            }}
          />
          <Stack
            alignItems="start"
          >
            <Typography
              variant='h3'
              fontWeight='bold'
              fontSize={{xs: '1.5rem', sm: '1.5rem', md: '2.0rem', lg: '2.4rem'}}
            >
              {username}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DateRangeOutlined fontSize="small"/>
              <Typography
                variant="subtitle1"
                fontSize={{xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.95rem'}}
              >
                {dateJoined}
              </Typography>
            </Stack>
            {!isSmallScreen && <UserBio bio={bio} maxWords={25}/>}
            {!isSmallScreen && isOwner && <Button onClick={handleEditClick}>Edit Profile</Button>}
          </Stack>
        </Stack>
        {isSmallScreen && <UserBio bio={bio} maxWords={25}/>}
        {isSmallScreen && isOwner && <Button onClick={handleEditClick}>Edit Profile</Button>}
      </Grid>

      {/* Cards Statistics */}
      <Grid
        container
        spacing={1}
        size={{xs: 12, md: 3}}
        paddingTop={1}
      >
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Ratings" value={statistics.ratings} href="/<user>/ratings"/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Watchlist" value={statistics.watchlist} href="/<user>/watchlist"/>
        </Grid>
        <Grid size={{xs: 4}}>
          <ProfileStatCard title="Reviews" value={statistics.reviews} href="/<user>/reviews"/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserHeader;
