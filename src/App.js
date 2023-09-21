import "./App.css";
import "toastr/build/toastr.min.css";
import Header from "./components/Navbar";
import LandingCard from "./components/LandingCard";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingCard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
