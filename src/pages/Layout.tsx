import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Container from "@mui/material/Container";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 10, display: "flex", flexDirection: "column", gap: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;