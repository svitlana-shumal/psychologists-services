import { Route, Routes } from "react-router-dom";
import Home from "./home/page";
import Psychologists from "./psychologists/page";
import Container from "./components/Container/page";
import Header from "./components/Header/page";
import css from "./App.module.css";

function App() {
  return (
    <Container>
      <Header />
      <div className={css.divider}></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        {/* <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
    </Container>
  );
}

export default App;
