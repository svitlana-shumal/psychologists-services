import { Route, Routes } from "react-router-dom";
import Home from "./home/page";
import Psychologists from "./psychologists/page";
import Container from "./components/Container/page";
import Header from "./components/Header/page";
import { FavoritesPage } from "./favorites/page";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Toaster position="top-right" />
    </Container>
  );
}

export default App;
