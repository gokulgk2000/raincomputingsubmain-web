import "./App.css";
import "toastr/build/toastr.min.css";
import Header from "../src/components/header/Navbar";
import LandingCard from "../src/pages/landing/LandingCard";
import { Route, Routes } from "react-router-dom";
import Footer from "../src/components/footer/Footer";

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
