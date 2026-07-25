"use client";
import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";
const RepocardSkeleton = () => (
  <Card
    className="w-full"
    sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}
  >
    <CardContent sx={{ p: 2, pb: 1 }}>
      <Box display="flex" alignItems="center">
        <Skeleton variant="circular" width={40} height={40} />
        <Box ml={2}>
          <Skeleton width={80} height={15} />
          <Skeleton width={60} height={10} />
        </Box>
      </Box>
      <Skeleton width="100%" height={48} sx={{ mt: 2 }} />
      <Box mt={2} display="flex" gap={1}>
        <Skeleton variant="rounded" width={50} height={24} />
        <Skeleton variant="rounded" width={50} height={24} />
        <Skeleton variant="rounded" width={50} height={24} />
      </Box>
      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        borderTop="1px dashed #ccc"
        pt={2}
      >
        <Skeleton width={80} height={12} />
        <Skeleton width={30} height={12} />
      </Box>
    </CardContent>
  </Card>
);

export default RepocardSkeleton;
