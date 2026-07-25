import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

const HeaderBar = () => {
  return (
    <Box
      sx={{
        width:"100%",
        maxWidth: "1265px",
        marginTop: "20px",
      }}
    >
      <div className="w-full flex justify-between items-center">
        <Box className="h-7 flex items-center gap-2  ">
          <Avatar
            sx={{ width: 20, height: 20 }}
            alt="mcp.ink"
            src="/icon.png"
            variant="square"
          />
          <Typography
            fontSize={20}
            variant="h3"
            fontWeight={"semiBold"}
            color="initial"
          >
            MCP.ink
          </Typography>
        </Box>
        <Button
          className="ml-auto whitespace-nowrap"
          variant="outlined"
          size="small"
          color="inherit"
        >
          Sign In
        </Button>
      </div>
    </Box>
  );
};

export default HeaderBar;
