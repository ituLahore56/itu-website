import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HomePage, AboutPage } from "./pages";
import "./App.css";
import NavBar from "./components/Navbar";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/:id" element={<AboutPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
