import { Stack } from "@mui/material";
import TitleLink from "./TitleLink";
import React from "react";

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const TitleSection = ({ title, description, children }: SectionProps) => {
  return (
    <Stack component="section" spacing={1}>
      <TitleLink title={title} description={description} />
      {children}
    </Stack>
  );
};

export default TitleSection;