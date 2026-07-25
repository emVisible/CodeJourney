"use client";
import { Box } from "@mui/material";
import { MCP_Repo } from "@prisma/client";
import { useEffect, useState } from "react";
import RepoCardWithHeader from "../base/RepoCardWithHeader";

const McpListCard = () => {
  const [repoFeatured, setRepoFeatured] = useState<MCP_Repo[]>([]);
  const [repoLatest, setRepoLatest] = useState<MCP_Repo[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingLastest, setLoadingLatest] = useState(true);

  const fetchData = async (
    type: "featured" | "latest",
    setData: (data: MCP_Repo[]) => void
  ) => {
    try {
      const response = await fetch("/api/home", {
        method: "POST",
        body: JSON.stringify({ type }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error loading ${type} data:`, error);
    } finally {
      setLoadingFeatured(false);
      setLoadingLatest(false);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchData("featured", setRepoFeatured),
      fetchData("latest", setRepoLatest),
    ]);
  }, []);

  return (
    <div className="max-w-[1265px] sm:w-sm md:w-md lg:w-lg">
      <Box width="100%" mt={4}>
        <RepoCardWithHeader
          data={repoFeatured}
          loading={loadingFeatured}
          isHome={true}
          title="Featured MCP Servers"
        ></RepoCardWithHeader>
      </Box>
      <Box width="100%" mt={4}>
        <RepoCardWithHeader
          data={repoLatest}
          loading={loadingLastest}
          isHome={true}
          title="Latest MCP Servers"
        ></RepoCardWithHeader>
      </Box>
    </div>
  );
};

export default McpListCard;
