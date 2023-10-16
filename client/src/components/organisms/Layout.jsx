import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Header, Footer } from "components/organisms";

const ContentLayout = styled(Box)({
  maxWidth: 1000,
  width: '80%',
  margin: '0 auto'
});

export default function MainLayout() {
  return (
    <>
      <Header />
      <ContentLayout>
        <Outlet />
      </ContentLayout>
      <Footer />
    </>
  );
}
