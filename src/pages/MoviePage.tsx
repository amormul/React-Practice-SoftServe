import {useContext} from "react";
import {MovieContext} from "../context/MovieProvider.tsx";
import MovieHeader from "../components/Movie/MovieHeader.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
import CardSlider from "../components/Card/CardSlider.tsx";
import MediaCard from "../components/Card/MediaCard.tsx";
import {useParams} from "react-router-dom";
import {Api} from "../components/api/config"
const MoviePage = () => {
  const {movieId} = useParams();
  const {movies} = useContext(MovieContext) || {movies: []};

  const filmData = movies.find((movie) => movie.id == movieId);

  if (!filmData) return <div>Film not found</div>;

  return (
    <>
      <MovieHeader
          title={filmData.title}
          id={filmData.id}
          description={filmData.description}
          duration={filmData.duration}
          rating={filmData.rating}
          year={filmData.year}
          genres={filmData.genres}
          actors={filmData.actors}
          director={filmData.director}
      />
      <TitleSection title="Актори">
        <CardSlider
          items={filmData.actors.map((actor, index) => ({
            id: index,
            title: actor.name,
            imageUrl: Api.IMAGES_ACTORS + "/" + actor.id,
            description: actor.char_name,
          }))}
          CardComponent={MediaCard}
        />
      </TitleSection>
    </>
  );
};

export default MoviePage;