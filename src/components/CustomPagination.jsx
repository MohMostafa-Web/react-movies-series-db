import { Pagination } from "@mui/material";

const CustomPagination = ({ setPage, numOfPages }) => {
  /* Create function to handle change in state "page" */
  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    setPage(value);
  };

  return (
    <Pagination
      count={numOfPages}
      color="primary"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        ".MuiPaginationItem-root": {
          color: "white",
          fontSize: {
            xs: "0.775rem",
            md: "0.875rem",
          },
          m: {
            xs: "0 2px",
            md: "0 4px",
          },
        },
      }}
      onChange={handlePageChange}
    />
  );
};

export default CustomPagination;
