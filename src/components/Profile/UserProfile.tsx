import {Container} from "@mui/material";
import UserHeader from "./UserHeader.tsx";
import reactUrl from "../../assets/react.svg"

const user = {
  username: "cinemalover",
  dateJoined: "Joined July 2024",
  avatarUrl: reactUrl,
  bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
};


export default function UserProfile() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 0
      }}
    >
      <UserHeader {...user} />
    </Container>
  );
}
