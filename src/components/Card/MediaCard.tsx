import {Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {StarOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import { truncateText } from "../../utils";

interface MediaCardProps {
  id: number;
  title: string;
  imageSrc: string;
  description?: string;
  rating?: number;
}

function MediaCard({...props}: MediaCardProps) {
  const {id, title, imageSrc, description, rating} = props;
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/film/${id}/details`);
  };

  return (
    <Card
      sx={{
        // width: "200px",
        maxHeight: "400px",
        borderRadius: "5px",
        transition: "transform 0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.01)",
          border: "1px solid rgba(255, 0, 0, 0.8)",
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
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{mt: 1, textAlign: "left"}}
          >
            {truncateText(description, 45)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default MediaCard;