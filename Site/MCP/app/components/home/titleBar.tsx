import { Typography } from "@mui/material";

const TitleBar = () => {
  return (
    <section className="sm:text-sm md:text-md xl:text-xl pt-28 flex flex-col items-center mt-3 sm:mt-8 md:12 lg:mt-32 w-full">
      <Typography
        sx={{
          fontFamily: "Arial, sans-serif",
          fontSize: 64,
          fontWeight: "bold",
        }}
      >
        Discover MCP Servers
      </Typography>
      <section className="mt-3 justify-center hidden sm:flex">
        <Typography
          sx={{
            maxWidth: "956px",
            fontFamily: "PingFang SC",
            fontSize: "22px",
            color: "#00000088",
            textAlign: "center",
          }}
        >
          Production-ready and experimental MCP Servers that extend AI
          capabilities through file access, database connections, API
          integrations, and other contextual services.
        </Typography>
      </section>
      <section className="p-1 mt-6 hidden lg:flex justify-center items-center gap-2 rounded-2xl border-[1px] border-[#cccccc59] bg-white">
        <Typography
          sx={{
            textAlign: "center",
            background: "#FC6739",
            borderRadius: "16px",
            maxWidth: "80px",
            color: "white",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          4000+
        </Typography>
        <Typography
          sx={{
            fontFamily: "PingFang SC",
            fontSize: 14,
            color: "#2d2d2d",
          }}
        >
          MCP Service Stored
        </Typography>
      </section>
    </section>
  );
};

export default TitleBar;
