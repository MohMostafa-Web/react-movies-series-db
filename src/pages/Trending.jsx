import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import PageTitle from "../components/PageTitle";
import SingleContent from "../components/SingleContent";
import CustomPagination from "../components/CustomPagination";
import { useGlobalContext } from "../context";

const Trending = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);

  const { setBottomNavIndex } = useGlobalContext();

  // console.log(process.env.REACT_APP_TMDB_API_KEY); // debug

  /* Create function to fetch data "Trending Movies and Series" */
  const fetchTrending = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
      )
      .then((response) => {
        // console.log(response.data); // debug
        setData(response.data.results);
        setNumOfPages(response.data.total_pages);
      })
      .catch((error) => {
        setData([]);
        setNumOfPages(0);
      });
  };

  
  useEffect(() => {
    setBottomNavIndex(0);
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      {/* Page Title */}
      <PageTitle>Trending</PageTitle>
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
                media_type={d.media_type}
                rating={d.vote_average}
              />
            );
          })}
      </Stack>
      {/* Pagination */}
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </>
  );
};

export default Trending;
