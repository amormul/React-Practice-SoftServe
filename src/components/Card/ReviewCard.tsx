import {useState} from "react";
import {Avatar, Card, CardContent, CardHeader, Link, Stack, Typography, Button, CardActions} from "@mui/material";
import {StarOutlined} from "@mui/icons-material";
import {truncateText} from "../../utils.ts";

interface ReviewCardProps {
  id: number;
  title: string;
  imageSrc: string;
  review: string;
  userRating: number;
  filmRating: number;
  reviewDate: string;
}

function ReviewCard({id, title, imageSrc, review, userRating, filmRating, reviewDate}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxReviewLength = 500;
  const truncatedReview = truncateText(review, maxReviewLength);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
          <Link
            href={`/film/${id}`}
            underline="hover"
            color="inherit"
            display="inline-flex"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{fontWeight: "bold", textAlign: "left"}}
            >
              {title}
            </Typography>
          </Link>
        }
        subheader={
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StarOutlined fontSize="small" color="warning"/>
            <Typography variant="subtitle2" paddingRight={1}>{filmRating}</Typography>
          </Stack>
        }
      />
      <CardContent sx={{paddingBottom: 0}}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <StarOutlined fontSize="small" color="success"/>
          <Typography variant="subtitle2" paddingRight={1}>{userRating}</Typography>
          <Typography variant="body2" color="text.secondary">{reviewDate}</Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{mt: 1, textAlign: "left"}}
        >
          {isExpanded ? review : truncatedReview}
        </Typography>
      </CardContent>
      <CardActions>
        {review.length > maxReviewLength && (
          <Button
            size="small"
            onClick={handleToggleExpand}
            sx={{mt: 1, width: "100%"}}
          >
            {isExpanded ? "Show Less" : "Show All"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ReviewCard;