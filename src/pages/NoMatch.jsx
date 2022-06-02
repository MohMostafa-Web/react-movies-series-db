import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import PageTitle from "../components/PageTitle";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <Stack justifyContent="center" alignItems="center">
      <PageTitle>Page Not Found</PageTitle>
      <Button variant="contained" size="small" onClick={() => navigate("/")}>Back to home</Button>
    </Stack>
  );
};

export default NoMatch;
