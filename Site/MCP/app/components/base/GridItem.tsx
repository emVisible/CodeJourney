import { Grid } from "@mui/material";
interface GridItemProps {
  children: JSX.Element;
}
const GridItem = (props: GridItemProps) => {
  const { children } = props;
  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
      }}
    >
      {children}
    </Grid>
  );
};

export default GridItem;
