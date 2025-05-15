import {useState} from "react";
import {Link, Typography} from "@mui/material";
import {truncateText} from "../../utils.ts";

interface UserBioProps {
  bio: string;
  maxWords: number;
}

export default function UserBio({bio, maxWords}: UserBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Typography
      maxWidth={{md: "450px", lg: "500px", xl: "600px"}}
      fontSize={{xs: "0.8rem", lg: "0.85rem"}}
      variant="subtitle2"
      textAlign="justify"
    >
      {isExpanded ? bio : truncateText(bio, maxWords)}
      <Link
        underline="hover"
        onClick={toggleExpand}
        padding={1}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </Link>
    </Typography>
  );
}