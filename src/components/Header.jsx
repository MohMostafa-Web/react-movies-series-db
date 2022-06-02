import { styled, Typography } from "@mui/material";

/* Create Styled Component "HeadingTypography" */
const HeadingTypography = styled(Typography)`
  width: 100%;
  padding-bottom: 15px;
  background-color: #39445a;
  color: white;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-size: 5vw;
  box-shadow: 0 1px 5px black;
  position: fixed;
  z-index: 99;
  cursor: pointer;
  @media (max-width: 1000px) {
    padding-top: 15px;
    font-size: 6.4vw;
  }
`;

const Header = () => {
  return (
    <HeadingTypography
      component="h1"
      align="center"
      onClick={() => window.scroll(0, 0)}
    >
      🎬 Entertainment Hub 🎥
    </HeadingTypography>
  );
};

export default Header;
