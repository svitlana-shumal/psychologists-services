import { Route, Routes } from "react-router-dom";
import Home from "./home/page";
import Psychologists from "./psychologists/Psychologists";
import Container from "./components/Container/page";
import Header from "./components/Header/page";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        {/* <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
    </Container>
  );
}

export default App;
