import {useState} from "react";
import {Typography, Link} from "@mui/material";

interface UserBioProps {
  bio: string;
  maxWords: number;
}

export default function UserBio({bio, maxWords}: UserBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const truncatedBio = bio.split(" ").slice(0, maxWords).join(" ") + "...";

  return (
    <Typography
      maxWidth={{ md: "450px", lg: "500px", xl: "600px" }}
      fontSize={{ xs: "0.7rem", sm: "0.75rem", md: "0.8rem", lg: "0.85rem" }}
      variant="subtitle2"
    >
      {isExpanded ? bio : truncatedBio}
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