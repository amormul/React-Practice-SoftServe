import {Stack} from "@mui/material";
import CardSlider from "../components/Card/CardSlider.tsx";
import MediaCard from "../components/Card/MediaCard.tsx";
import ReviewCard from "../components/Card/ReviewCard.tsx";
import TitleSection from "../components/Common/TitleSection.tsx";
import {useContext, useEffect, useState} from "react";
import UserHeader from "../components/Profile/UserHeader.tsx";
import {UserContext} from "../context/AuthProvider.tsx";


const ProfilePage = () => {
  const {user} = useContext(UserContext);

  const statistics = {
    ratings: ratings.length,
    watchlist: watchlist.length,
    reviews: reviews.length,
  };

  return (
    <Stack spacing={5}>
      <UserHeader {...user} statistics={statistics} />
      <TitleSection title="Мої" description="My Ratings">
        <CardSlider items={ratings} CardComponent={MediaCard} />
      </TitleSection>
      <TitleSection title="Watchlist" description="My Watchlist">
        <CardSlider items={watchlist} CardComponent={MediaCard} />
      </TitleSection>
      <TitleSection title="Reviews" description="My Reviews">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </TitleSection>
    </Stack>
  );
};

export default ProfilePage;
