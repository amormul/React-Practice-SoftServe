import Stack from "@mui/material/Stack";
import {Link, Typography} from "@mui/material";
import {KeyboardArrowRight} from "@mui/icons-material";


interface TitleSectionProps {
  title: string;
  description?: string;
  href?: string
}

function TitleLink({title, description, href}: TitleSectionProps) {
  return (
    <Stack direction="column" alignItems="flex-start">
      <Link
        href={href}
        sx={{
          cursor: "pointer",
          borderLeft: "4px solid red",
          paddingLeft: "10px"
        }}
      >
        <Stack direction="row" alignItems="center">
          <Typography
            variant="inherit"
            sx={{
              fontWeight: "bold",
              fontSize: {xs: "1.5rem", sm: "2rem"}
            }}
          >
            {title}
          </Typography>
          <KeyboardArrowRight
            color="error"
            fontSize="large"
          />
        </Stack>
      </Link>
      {description && (
        <Typography variant="subtitle2" color="textSecondary">{description}</Typography>
      )}
    </Stack>
  );
}

export default TitleLink;