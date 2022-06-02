import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Container>
      </div>
      <BottomNav />
    </>
  );
}

export default App;
