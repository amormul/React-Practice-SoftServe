import {Grid, Typography, Stack} from "@mui/material";

interface FilmDetail {
  name: string;
  description: string;
}

interface FilmDetailListProps {
  details: FilmDetail[];
}

const FilmDetailList = ({details}: FilmDetailListProps) => {
  return (
    <Stack spacing={2}>
      {details.map((detail, index) => (
        <Grid
          container
          key={index}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderBottom: '1px solid #ccc',
            paddingBottom: 1,
            marginBottom: 1,
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            textAlign="start"
            sx={{flex: 1}}
          >
            {detail.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{flex: 2, textAlign: 'justify'}}
          >
            {detail.description}
          </Typography>
        </Grid>
      ))}
    </Stack>
  );
};

export default FilmDetailList;