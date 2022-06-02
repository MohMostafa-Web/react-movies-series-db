import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Whatshot, MovieCreation, Tv, Search } from "@mui/icons-material/";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const BottomNav = () => {
  const { bottomNavIndex, setBottomNavIndex } = useGlobalContext();

  const navigate = useNavigate();

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        backgroundColor: "#2d313a",
        color: "white",
        position: "fixed",
        left: 0,
        bottom: 0,
        zIndex: 99,
      }}
      value={bottomNavIndex}
      onChange={(e, newValue) => setBottomNavIndex(newValue)}
      showLabels
    >
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Trending"
        icon={<Whatshot />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Movies"
        icon={<MovieCreation />}
        onClick={() => navigate("/movies")}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Tv Series"
        icon={<Tv />}
        onClick={() => navigate("/series")}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Search"
        icon={<Search />}
        onClick={() => navigate("/search")}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
