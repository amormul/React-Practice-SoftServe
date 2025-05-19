import MovieFilter from '../components/MovieFilter.tsx';
import MediaCard from "../components/Card/MediaCard.tsx";
import {useEffect, useState} from "react";
import filmJson from "../data/filmData.json";
import CardSlider from "../components/Card/CardSlider.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
const CatalogPage = () => {


    const [filmData, setFilmData] = useState(null);

    useEffect(() => {
        setFilmData(filmJson);
    }, []);

    if (!filmData) return <div>Loading...</div>;

    const {
        moreLikeThisFilms,
    } = filmData;

    return (
        <div>
            <MovieFilter />
            <TitleSection title="Результати пошуку">
                <CardSlider
                    items={moreLikeThisFilms.map((elem, index) => ({
                        id: index, // Use index as a unique ID since `actors` doesn't have an `id`
                        title: elem.title,
                        imageSrc: elem.imageSrc,
                    }))}
                    CardComponent={MediaCard}
                />
            </TitleSection>
        </div>
    );
};

export default CatalogPage;