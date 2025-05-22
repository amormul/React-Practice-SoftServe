import {Card, CardContent, CardMedia, Stack, Typography, Box} from "@mui/material";
import {StarOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {truncateText} from "../../utils";
import {ReactNode} from "react";

interface MediaCardProps {
  id: number;
  title: string;
  imageUrl: string;
  path?: string;
  description?: string;
  rating?: number;
  IconComponent?: ReactNode;
}

function MediaCard({...props}: MediaCardProps) {
  const {title, imageUrl, description, rating, path, IconComponent} = props;
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (path) navigate(path);
  };

  return (
    <Card
      sx={{
        height: "430px",
        borderRadius: "5px",
        transition: "transform 0.3s",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "scale(1.01)",
          border: "1px solid rgba(255, 0, 0, 0.8)",
        },
      }}
      onClick={handleCardClick}
    >
      {/* Icon Button in the top-right corner */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 100,
        }}
        onClick={e => e.stopPropagation()}
      >
        {IconComponent}
      </Box>

      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{height: {xs: "320px"}}}
      />
      <CardContent>
        {rating && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StarOutlined fontSize="small" color="warning" />
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