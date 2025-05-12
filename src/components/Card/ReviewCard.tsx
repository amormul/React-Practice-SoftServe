import {Avatar, Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import {StarOutlined} from "@mui/icons-material";

interface ReviewCardProps {
  id: number;
  title: string;
  imageSrc: string;
  review: string;
  userRating: number;
  reviewDate: string;
}

function ReviewCard({id, title, imageSrc, review, userRating, reviewDate}: ReviewCardProps) {
  const maxReviewLength = 500;
  const truncatedReview = review.length > maxReviewLength ? review.slice(0, maxReviewLength) + "..." : review;

  return (
    <Card
      sx={{
        maxWidth: {sm: "60%", lg: "70%"},
        height: "auto",
        borderRadius: "5px",
      }}
    >
      <CardHeader
        sx={{
          textAlign: "left",
          borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
        }}
        avatar={
          <Avatar variant="rounded" src={imageSrc} sx={{width: 52, height: 76}}/>
        }
        title={
          <Link href={`/film/${id}`} underline="hover" color="inherit">
            <Typography
              variant="h6"
              component="div"
              sx={{fontWeight: "bold", textAlign: "left"}}
            >
              {title}
            </Typography>
          </Link>
        }
        subheader={"Somet"}
      />
      <CardContent sx={{paddingTop: 1}}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <StarOutlined fontSize="small" color="success"/>
          <Typography variant="subtitle2" paddingRight={1}>{userRating}</Typography>
          <Typography variant="body2" color="text.secondary">{reviewDate}</Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{mt: 1, textAlign: "left"}}
        >
          {truncatedReview}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;