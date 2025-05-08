import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

interface ProfileStatCardProps {
  title: string;
  value: number;
  href: string;
}

const ProfileStatCard = ({title, value, href}: ProfileStatCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#1f1f1f'
      }}
    >
      <CardActionArea href={href}>
        <CardContent sx={{textAlign: "center", padding: 1}}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontSize={{ xs: '0.6rem', sm: '0.65rem', md: '0.8rem', lg: '1rem' }}
            fontWeight="bold"
            color="#fff"
            margin={0}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            fontSize={{ xs: '1rem', sm: '1.2rem', md: '1.70rem', lg: '2rem' }}
            color="#c1c1c1"
          >
            {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileStatCard;
