import {Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {StarOutlined} from "@mui/icons-material";

// import {useNavigate} from "react-router-dom";

interface MediaCardProps {
  id: number;
  title: string;
  imageSrc: string;
  description?: string;
  rating?: number;
}

function MediaCard({...props}: MediaCardProps) {
  const {title, imageSrc, description, rating} = props;

  // const navigate = useNavigate()

  const maxDescriptionLength = 45;
  const truncatedDescription =
    description && description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description;

  const handleCardClick = () => {
    // navigate(`/item/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: "200px",
        maxHeight: "375px",
        borderRadius: "5px",
        transition: "transform 0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt={title}
      />
      <CardContent>
        {rating && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StarOutlined fontSize="small" color="warning"/>
            <Typography variant="body2">{rating}</Typography>
          </Stack>
        )}
        <Typography
          variant="body1"
          component="div"
          sx={{fontWeight: "bold", textAlign: "left"}}
        >
          {title}
        </Typography>
        {truncatedDescription && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{mt: 1, textAlign: "left"}}
          >
            {truncatedDescription}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default MediaCard;