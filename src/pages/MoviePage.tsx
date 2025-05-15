import {Stack} from "@mui/material";
import filmJson from "../data/filmData.json"
import MovieHeader from "../components/Movie/MovieHeader.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
import CardSlider from "../components/Card/CardSlider.tsx";
import MediaCard from "../components/Card/MediaCard.tsx";
import {useEffect, useState} from "react";
// import ReviewCard from "../components/Card/ReviewCard.tsx";

const MoviePage = () => {
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    setFilmData(filmJson);
  }, []);

  if (!filmData) return <div>Loading...</div>;

  const {
    title,
    posterUrl,
    trailerUrl,
    releaseDate,
    description,
    IMDbRating,
    details,
    actors,
    moreLikeThisFilms,
    // comments
  } = filmData;

  return (
    <Stack spacing={5}>
      <MovieHeader
        title={title}
        posterUrl={posterUrl}
        trailerUrl={trailerUrl}
        releaseDate={releaseDate}
        description={description}
        IMDbRating={IMDbRating}
        details={details}
      />
      <TitleSection title="Актори">
        <CardSlider
          items={actors.map((actor, index) => ({
            id: index, // Use index as a unique ID since `actors` doesn't have an `id`
            title: actor.name,
            imageSrc: actor.photoUrl,
            description: actor.role,
          }))}
          CardComponent={MediaCard}
        />
      </TitleSection>
      <TitleSection title="Інші фільми">
        <CardSlider items={moreLikeThisFilms} CardComponent={MediaCard}/>
      </TitleSection>

      {/*<TitleSection title="Коментарі">*/}
      {/*  {comments.map((comment, index) => (*/}
      {/*    <ReviewCard key={index} {...comment} />*/}
      {/*  ))}*/}
      {/*</TitleSection>*/}
    </Stack>
  );
};

export default MoviePage;