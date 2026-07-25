"use client";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";

const Seperator = () => {
  return <img src="/seperator.svg" />;
};

const BreadcrumbBar = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const repo = searchParams.get("repo");

  return (
    <Box className="mt-20 w-full">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Seperator />}
        className="flex items-center md:w-md "
      >
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", marginRight: "14px" }}
          href="/"

        >
          <img
            className={"text-[#D9D9D9]"}
            width={24}
            src="/homeIcon.svg"
            alt="home icon"
          />
        </Link>
        <Typography
          sx={{
            display: "flex",
            color: "#7d7d7d",
            alignItems: "center",
            marginLeft: "14px",
            marginRight: "14px",
          }}
        >
          {path.slice(1)}
        </Typography>
        <Typography
          sx={{
            color: "#7d7d7d",
            display: "flex",
            alignItems: "center",
            marginLeft: "14px",
          }}
        >
          {repo}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbBar;
