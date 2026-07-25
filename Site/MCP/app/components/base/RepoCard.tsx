import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { MCP_Repo } from "@prisma/client";
import { FC } from "react";

interface CardProps {
  item: MCP_Repo;
}

const RepoCard: FC<CardProps> = (props) => {
  const { repo, desc, star, tags, update } = props.item;
  const displayDesc =
    desc === "null" || !desc ? repo : desc.slice(0, 65) + "...";
  const tagList = tags ? tags.split(",").slice(0, 3) : ["mcp"];

  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, cursor: "pointer" }}
    >
      <Link href={{ pathname: "/detail", query: { repo } }} passHref>
        <CardContent sx={{ p: 2, pb: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                variant="rounded"
                src={`https://github.com/${repo.split("/")[0]}.png?size=40`}
              />
              <Box ml={2}>
                <Typography fontSize={12} fontWeight={600}>
                  {repo.split("/")[1]}
                </Typography>
                <Typography fontSize={10} color="text.secondary">
                  by {repo.split("/")[0]}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, height: 48, overflow: "hidden", fontSize:"12px", color:"#666666"}}
          >
            {displayDesc}
          </Typography>
          <Box
            mt={2}
            display="flex"
            flexWrap="wrap"
            overflow="hidden"
            height={"24px"}
            gap={1}
          >
            {tagList.map((tag, index) => (
              <Chip
                key={index}
                label={`# ${tag === "null" ? "mcp" : tag}`}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            borderTop="1px dashed #ccc"
            pt={2}
          >
            <Box display="flex" alignItems="center">
              <img
                src="/history.svg"
                alt="history"
                width={12}
                className="mr-1"
              />
              <Typography fontSize={10} color="text.secondary">
                Last updated{" "}
                {new Date(update).toLocaleString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <img src="/github.svg" alt="stars" width={12} className="mr-1" />
              <Typography fontSize={10}>{star}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RepoCard;
