import { Typography } from "@mui/material";

const NotFoundMsg = ({ children }) => {
  return (
    <Typography
      variant="h5"
      component="h3"
      color="error"
      fontStyle="italic"
      fontWeight="300"
    >
      {children}
    </Typography>
  );
};

export default NotFoundMsg;
