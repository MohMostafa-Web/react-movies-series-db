import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import PageTitle from "../components/PageTitle";
import Genres from "../components/Genres";
import SingleContent from "../components/SingleContent";
import CustomPagination from "../components/CustomPagination";
import { useGlobalContext } from "../context";
import NotFoundMsg from "../components/NotFoundMsg";

const Movies = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);

  const { genresIdsForURL, setBottomNavIndex } = useGlobalContext();

  /* Create function to fetch data "Movies" */
  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&page=${page}&with_genres=${genresIdsForURL(selectedGenres)}`
      )
      .then((response) => {
        // console.log(response.data); // debug
        if (response.data.results.length !== 0) {
          setData(response.data.results);
          setShowNotFoundMsg(false);
        } else {
          setData([]);
          setShowNotFoundMsg(true);
        }
        setNumOfPages(
          response.data.total_pages > 500 ? 500 : response.data.total_pages
        );
      })
      .catch((error) => {
        setData([]);
        setNumOfPages(0);
        setShowNotFoundMsg(false);
      });
  };

  /* using useEffect() to fetch data when state "page" or "selectedGenres" changes */
  useEffect(() => {
    setBottomNavIndex(1);
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedGenres]);

  return (
    <>
      {/* Page Title */}
      <PageTitle>Movies</PageTitle>
      {/* Genres */}
      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
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
                media_type="movie"
                rating={d.vote_average}
              />
            );
          })}
        {/* Not Found Message */}
        {showNotFoundMsg && <NotFoundMsg>No Movies found</NotFoundMsg>}
      </Stack>
      {/* Pagination */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Movies;
