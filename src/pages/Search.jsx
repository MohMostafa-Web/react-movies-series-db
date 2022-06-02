import { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Stack, TextField, Button, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SingleContent from "../components/SingleContent";
import CustomPagination from "../components/CustomPagination";
import { useGlobalContext } from "../context";
import NotFoundMsg from "../components/NotFoundMsg";

/* Create customized Theme "darkTheme" with mode "dark" & primary.main "#fff" */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const { setBottomNavIndex } = useGlobalContext();

  /* Create function to fetch data according to state "searchText" */
  const fetchSearch = () => {
    if (searchText)
      axios
        .get(
          `https://api.themoviedb.org/3/search/${
            tabValue === 0 ? "movie" : "tv"
          }?api_key=${
            process.env.REACT_APP_TMDB_API_KEY
          }&query=${searchText}&page=${page}`
        )
        .then((response) => {
          // console.log(response.data.results); // debug
          if (response.data.results.length !== 0) {
            setData(response.data.results);
            setShowNotFoundMsg(false);
          } else {
            setData([]);
            setShowNotFoundMsg(true);
          }
          setNumOfPages(response.data.total_pages);
        })
        .catch((error) => {
          setData([]);
          setShowNotFoundMsg(false);
          setNumOfPages(0);
        });
  };

  /* using useEffect() to fetch data when state "page" or "tabValue" changes */
  useEffect(() => {
    setBottomNavIndex(3);
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tabValue]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Stack direction="row" justifyContent="center" gap={2} mt={1}>
          {/* Search Input Field */}
          <TextField
            variant="filled"
            label="Search"
            sx={{ flex: 1, maxWidth: 500 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoComplete="off"
          />
          {/* Search Button */}
          <Button variant="contained" onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </Stack>
        {/* Tabs */}
        <Tabs
          sx={{ mt: 2, mb: 5 }}
          centered
          textColor="primary"
          indicatorColor="primary"
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue);
            setPage(1);
          }}
        >
          <Tab label="Search Movies" />
          <Tab label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      {/* Page Data */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-around"
        gap={2}
      >
        {data.length !== 0 &&
          data.map((d) => {
            return (
              <SingleContent
                key={d.id}
                id={d.id}
                poster={d.poster_path}
                title={d.title || d.name}
                date={d.release_date || d.first_air_date}
                media_type={tabValue === 0 ? "movie" : "tv"}
                rating={d.vote_average}
              />
            );
          })}
        {/* Not Found Message */}
        {searchText && showNotFoundMsg && (
          <NotFoundMsg>
            {tabValue === 0 ? "No Movies found" : "No Series found"}
          </NotFoundMsg>
        )}
      </Stack>
      {/* Pagination */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Search;
