import MovieFilter from '../components/MovieFilter.tsx';
import MediaCard from "../components/Card/MediaCard.tsx";
import {useContext} from "react";
import CardSlider from "../components/Card/CardSlider.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
import {MovieContext} from "../context/MovieProvider.tsx";
import {Api} from '../components/api/config.ts';
import {useNavigate} from "react-router-dom";

const CatalogPage = () => {
    const {movies} = useContext(MovieContext) || {movies: []};
    const navigate = useNavigate();

    return (
        <div>
            <MovieFilter />

            <TitleSection title="Фільми">
                <CardSlider
                    items={movies.map((elem) => ({
                        id: elem.id,
                        title: elem.title,
                        imageUrl: Api.IMAGES_MOVIES + "/" + elem.id,
                        onClick: () => navigate(`/movie/${elem.id}`)
                    }))}
                    CardComponent={({ id, title, imageUrl }) => (
                        <MediaCard
                            id={id}
                            title={title}
                            imageUrl={imageUrl}
                            path={`/movie/${id}`}
                            style={{ height: 300, width: 200, objectFit: 'cover', cursor: 'pointer' }}
                        />
                    )}
                />
            </TitleSection>
        </div>
    );
};

export default CatalogPage;
