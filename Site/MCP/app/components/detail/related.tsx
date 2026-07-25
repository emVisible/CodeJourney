"use client";
import { useEffect, useState } from "react";
import RepoCardWithHeader from "../base/RepoCardWithHeader";
import { MCP_Repo } from "@prisma/client";
import { Box } from "@mui/material";

const Related = () => {
  const [related, setRelated] = useState<MCP_Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (
    search: string,
    setData: (data: MCP_Repo[]) => void
  ) => {
    try {
      const response = await fetch("/api/relate", {
        method: "POST",
        body: JSON.stringify({ search }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error loading data:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("server", setRelated);
  }, []);
  return (
    <Box width="100%" mt={4}>
      <RepoCardWithHeader
        data={related}
        title="Related"
        isHome={false}
        loading={loading}
      ></RepoCardWithHeader>
    </Box>
  );
};

export default Related;
