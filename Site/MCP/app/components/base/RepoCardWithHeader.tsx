import { Box, Grid, Typography } from "@mui/material";
import { MCP_Repo } from "@prisma/client";
import GridItem from "./GridItem";
import RepoCard from "./RepoCard";
import RepocardSkeleton from "./RepoCardSkeleton";
interface RepoCardWithHeaderProps {
  data: MCP_Repo[];
  loading: boolean;
  title: string;
  isHome: boolean;
}
const RepoCardWithHeader = (props: RepoCardWithHeaderProps) => {
  const { data, loading, title, isHome } = props;
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontSize={20} fontWeight={600}>
          {title}
        </Typography>
        {isHome && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" fontWeight={500}>
              View All
            </Typography>
            <img src="/more.png" alt="more" width={20} />
          </Box>
        )}
      </Box>
      <Grid container spacing={2} >
        {loading
          ? new Array(8).fill(0).map((item, index) => (
              <GridItem key={"skeleton-featured" + index}>
                <RepocardSkeleton />
              </GridItem>
            ))
          : data.map((item, index) => (
              <GridItem key={"featured" + index}>
                <RepoCard item={item} />
              </GridItem>
            ))}
      </Grid>
    </div>
  );
};

export default RepoCardWithHeader;
