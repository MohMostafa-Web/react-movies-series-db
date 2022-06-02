import { Typography } from "@mui/material";

const PageTitle = ({ children }) => {
  return (
    <Typography
      sx={{
        p: "4px",
        mb: "8px",
        textTransform: "uppercase",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: {
          xs: "6.4vw",
          md: "5vw",
          lg: "4vw",
        },
      }}
      variant="h2"
      component="h2"
      align="center"
    >
      {children}
    </Typography>
  );
};

export default PageTitle;
