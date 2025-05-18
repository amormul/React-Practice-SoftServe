import Navbar from "../components/Common/Navbar.tsx";
import BannerSlider from "../components/Common/BannerSlider.tsx";
import CardSlider from "../components/Card/CardSlider.tsx";
import MediaCard from "../components/Card/MediaCard.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
import filmdData from '../data/filmData.json'
import {Stack} from "@mui/material";
import Container from "@mui/material/Container";

const MainPage = () => {
  return (
    <>
      <Navbar/>
      <BannerSlider/>
      <Container>
        <Stack spacing={5} paddingTop={2}>
          <TitleSection title="Зараз у кіно">
            <CardSlider items={filmdData.moreLikeThisFilms} CardComponent={MediaCard}/>
          </TitleSection>
          <TitleSection title="Прем’єри">
            <CardSlider items={filmdData.moreLikeThisFilms} CardComponent={MediaCard}/>
          </TitleSection>
        </Stack>
      </Container>
    </>
  );
};

export default MainPage;
