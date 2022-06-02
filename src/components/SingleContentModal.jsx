import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Backdrop, Box, Modal, Fade, Button } from "@mui/material";
import YoutubeIcon from "@mui/icons-material/YouTube";
import {
  basic_youtube_url,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config";
import SingleContentCarousel from "./SingleContentCarousel";
import "./SingleContentModal.css";

/* Create style for Modal */
const style = {
  width: {
    xs: "90%",
    lg: "85%",
  },
  height: "80%",
  p: {
    xs: "8px",
    sm: "16px 8px",
  },
  bgcolor: "#39445a",
  color: "white",
  border: "1px solid #282c34",
  borderRadius: "10px",
  outline: 0,
  boxShadow: 5,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const SingleContentModal = ({ id, media_type, children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({});
  const [video, setVideo] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Create function to fetch data "Content Details" according to "media_type" & "id" */
  const fetchContentDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        // console.log(response.data); // debug
        setContent(response.data);
      })
      .catch((error) => {
        // console.log(error); // debug
        setContent({});
      });
  };

  /* Create function to fetch data "Content Video" according to "media_type" & "id" */
  const fetchContentVideo = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        // console.log(response.data.results[0]?.key); // debug
        setVideo(response.data.results[0]?.key);
      })
      .catch((error) => {
        // console.log(error); // debug
        setVideo("");
      });
  };

  /* using useEffect() to fetch data "Content Details" & "Content Video" oncetime at initial render */
  useEffect(() => {
    fetchContentDetails();
    fetchContentVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack
        sx={{
          width: "200px",
          height: "380px",
          p: "5px",
          bgcolor: "#282c34",
          fontFamily: '"Montserrat", sans-serif',
          borderRadius: "10px",
          transition: "all 0.3s",
          cursor: "pointer",
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
        }}
        onClick={handleOpen}
      >
        {children}
      </Stack>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {Object.keys(content).length !== 0 && (
              // Content Modal
              <div className="content-modal">
                {/* Poster Image */}
                <img
                  className="modal-poster"
                  src={
                    content.poster_path
                      ? img_500 + content.poster_path
                      : unavailable
                  }
                  alt={content.title || content.name}
                />
                {/* Landscape Image */}
                <img
                  className="modal-landscape"
                  src={
                    content.backdrop_path
                      ? img_500 + content.backdrop_path
                      : unavailableLandscape
                  }
                  alt={content.title || content.name}
                />
                {/* Modal About */}
                <div className="modal-about">
                  {/* Modal Title */}
                  <h2 className="modal-title">
                    {content.title || content.name} (
                    {(
                      content.release_date ||
                      content.last_air_date ||
                      "----"
                    ).slice(0, 4)}
                    )
                  </h2>
                  {/* Modal Tagline */}
                  {content.tagline && (
                    <span className="modal-tagline">{content.tagline}</span>
                  )}
                  {/* Modal Description */}
                  {content.overview && (
                    <p className="modal-description">{content.overview}</p>
                  )}
                  {/* SingleContentCarousel */}
                  <SingleContentCarousel id={id} media_type={media_type} />
                  {/* Watch The Trailer Button */}
                  <Button
                    sx={{
                      bgcolor: "#f50057",
                      ":hover": {
                        bgcolor: "#c51162",
                      },
                    }}
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<YoutubeIcon />}
                    href={basic_youtube_url + video}
                    target="_blank"
                  >
                    Watch The Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SingleContentModal;
