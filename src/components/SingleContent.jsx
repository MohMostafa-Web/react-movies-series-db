import { Badge, Stack, Typography } from "@mui/material";
import { img_300, unavailable } from "../config";
import SingleContentModal from "./SingleContentModal";

const SingleContent = ({ id, poster, title, date, media_type, rating }) => {
  return (
    <>
      {/* Single Content Modal */}
      <SingleContentModal id={id} media_type={media_type}>
        {/* Badge */}
        <Badge
          sx={{ ".MuiBadge-badge": { fontSize: "0.85rem" } }}
          badgeContent={rating}
          color={rating > 5 ? "primary" : "secondary"}
        />
        {/* Poster Image */}
        <img
          src={poster ? img_300 + poster : unavailable}
          alt={title}
          style={{
            maxWidth: "100%",
            borderRadius: "inherit",
            objectFit: "cover",
          }}
        />
        {/* Content Title */}
        <Typography
          sx={{
            p: "8px 0",
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "bold",
          }}
          varaint="h3"
          component="h3"
          title={title}
        >
          {title.length < 35 ? title : title.slice(0, 35) + "...."}
        </Typography>
        {/* Content Subtitles */}
        <Stack
          flex={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          p="0 2px 3px"
        >
          <Typography
            variant="subtitle2"
            component="span"
            fontFamily="inherit"
            fontWeight="bold"
          >
            {media_type === "movie" ? "Movie" : "Tv Series"}
          </Typography>
          <Typography
            variant="subtitle2"
            component="span"
            fontFamily="inherit"
            fontWeight="bold"
          >
            {date}
          </Typography>
        </Stack>
      </SingleContentModal>
    </>
  );
};

export default SingleContent;
