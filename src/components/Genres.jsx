import React, { useEffect } from "react";
import axios from "axios";
import { Box, Chip } from "@mui/material";

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
}) => {

  /* Create function to fetch data "Genres" according to type "movie" or "tv" */
  const fetchGenres = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        // console.log(response.data.genres); // debug
        setGenres(response.data.genres);
      });
  };

  /* using useEffect() to fetch data oncetime at initial render */
  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Create function to add genre to state "selectedGenres" and remove it from state "genres" */
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
  };

  /* Create function to add genre to state "genres" and remove it from state "selectedGenres" */
  const handleRemove = (genre) => {
    setGenres([...genres, genre]);
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id));
  };

  return (
    <Box
      sx={{
        mb: 3,
        textAlign: {
          xs: "center",
          sm: "left",
        },
      }}
    >
      {/* Chips of Selected Generes */}
      {selectedGenres.map((g) => (
        <Chip
          sx={{ margin: "4px 2px" }}
          key={g.id}
          label={g.name}
          size="small"
          color="primary"
          clickable
          onDelete={() => handleRemove(g)}
        />
      ))}
      {/* Chips of Generes */}
      {genres.map((g) => (
        <Chip
          sx={{
            margin: "4px 2px",
            bgcolor: "white",
            ":hover": {
              bgcolor: "#b9b9b9",
            },
          }}
          key={g.id}
          label={g.name}
          size="small"
          clickable
          onClick={() => handleAdd(g)}
        />
      ))}
    </Box>
  );
};

export default Genres;
