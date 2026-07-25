"use client";
import { footerLinks } from "@/app/data/staticData";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const FooterBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <footer className="my-20">
      <Grid container spacing={4} gap={18} justifyContent={"space-between"}>
        {footerLinks.map((column, index) => (
          <Grid width={200} key={column.title + index}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
              }}
            >
              {column.title}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              {column.links.map((link, index) => (
                <li key={link.label + index}>
                  <Link
                    href={link.url}
                    color="inherit"
                    underline="hover"
                    sx={{
                      display: "inline-block",
                      py: 0.5,
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="body2" fontSize={16} color={"#666666"}>
          © 2025 • mcp.ink All rights reserved. Built by UIpaas.
        </Typography>
        <Typography variant="body2" fontSize={16} color={"#666666"}>
          continuous updating
        </Typography>
      </Grid>
    </footer>
  );
};
export default FooterBar;
