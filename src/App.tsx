import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./components/Container/page";
import Header from "./components/Header/page";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/RequireAuth/page";
import Loader from "./components/Loader/page";

const Home = lazy(() => import("./home/page"));
const Psychologists = lazy(() => import("./psychologists/page"));
const FavoritesPage = lazy(() =>
  import("./favorites/page").then((module) => ({
    default: module.FavoritesPage,
  }))
);

function App() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </Container>
  );
}

export default App;
