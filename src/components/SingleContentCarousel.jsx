import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { img_300, noPicture } from "../config";
import "./SingleContentCarousel.css";

const SingleContentCarousel = ({ id, media_type }) => {
  const [cast, setCast] = useState([]);

  /* Settings for Slider */
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow:
      cast.length > 7 ? 7 : cast.length > 6 ? 6 : cast.length > 5 ? 5 : 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  /* Create function to fetch data "Content Cast" according to "media_type" & "id" */
  const fetchContentCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        // console.log(response.data.cast); // debug
        setCast(response.data.cast);
      })
      .catch((error) => {
        // console.log(error); // debug
        setCast([]);
      });
  };

  /* using useEffect() to fetch data "Content Cast" oncetime at initial render */
  useEffect(() => {
    fetchContentCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Create slide items using map() */
  const items = cast?.map((p, index) => (
    <div className="slide-item" key={index}>
      <img
        className="actor-img"
        src={p.profile_path ? img_300 + p.profile_path : noPicture}
        alt={p.name}
      />
      <h4 className="actor-name">{p.name}</h4>
    </div>
  ));

  return (
    <div className="modal-carousel">
      {cast.length > 3 ? (
        <Slider {...settings}>{items}</Slider>
      ) : (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {items}
        </div>
      )}
    </div>
  );
};

export default SingleContentCarousel;
