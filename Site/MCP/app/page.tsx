import FooterBar from "./components/home/footerBar";
import HeaderBar from "./components/home/headerBar";
import SearchBar from "./components/home/searchBar";
import TitleBar from "./components/home/titleBar";
import McpListCard from "./components/home/mcpListCard";
import { Box } from "@mui/material";
import type { Viewport } from "next";

export const viewport: Viewport = {
  maximumScale: 3,
};

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/background.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <HeaderBar></HeaderBar>
        <TitleBar></TitleBar>
        <SearchBar></SearchBar>
      </Box>
      <McpListCard></McpListCard>
      <FooterBar></FooterBar>
    </Box>
  );
};

export default Home;
