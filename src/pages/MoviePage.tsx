import {useContext} from "react";
import {MovieContext} from "../context/MovieProvider.tsx";
import MovieHeader from "../components/Movie/MovieHeader.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
import CardSlider from "../components/Card/CardSlider.tsx";
import MediaCard from "../components/Card/MediaCard.tsx";
import {useParams} from "react-router-dom";

const MoviePage = () => {
  const {movieId} = useParams();
  const {movies} = useContext(MovieContext) || {movies: []};

  const filmData = movies.find((movie) => movie.title === movieId);

  if (!filmData) return <div>Film not found</div>;

  const {
    title,
    posterUrl,
    trailerUrl,
    releaseDate,
    description,
    IMDbRating,
    actors,
    relatedFilms,
    genres,
    duration,
    language,
    director,
    reviews
  } = filmData;

  return (
    <>
      <MovieHeader
        title={title}
        posterUrl={posterUrl}
        releaseDate={releaseDate}
        description={description}
        IMDbRating={IMDbRating}
        trailerUrl={trailerUrl}
        totalReviews={reviews.length}
        details={[
          {name: "Жанри", description: genres.join(", ")},
          {name: "Тривалість", description: duration},
          {name: "Мова", description: language},
          {name: "Режисер", description: director}
        ]}
      />
      <TitleSection title="Актори">
        <CardSlider
          items={actors.map((actor, index) => ({
            id: index,
            title: actor.name,
            imageUrl: actor.photoUrl,
            description: actor.role,
          }))}
          CardComponent={MediaCard}
        />
      </TitleSection>
      <TitleSection title="Інші фільми">
        <CardSlider
          items={relatedFilms.map((film, index) => ({
            id: index,
            title: film.title,
            imageUrl: film.posterUrl
          }))}
          CardComponent={MediaCard}
        />
      </TitleSection>
    </>
  );
};

export default MoviePage;