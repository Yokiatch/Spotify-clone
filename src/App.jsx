import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import SpotifyHome from "./components/SpotifyHome";

const App = () => {
  return (
    <Router>
      <Auth />
      <Routes>
        <Route path="/" element={<SpotifyHome />} />
      </Routes>
    </Router>
  );
};

export default App;
