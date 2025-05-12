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
          <Typography variant="h4" sx={{fontWeight: "bold"}}>{title}</Typography>
          <KeyboardArrowRight sx={{fontSize: "40px"}}/>
        </Stack>
      </Link>
      {description && (
        <Typography variant="subtitle1" color="textSecondary">{description}</Typography>
      )}
    </Stack>
  );
}

export default TitleLink;