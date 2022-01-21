import React from "react";
import { Routes, Route } from "react-router-dom";

import Cryptocurrencies from "./components/Cryptocurrencies";
import Exchanges from "./components/Exchanges";
import News from "./components/News";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";

import CryptoProvider from "./store/CryptoContext";

function App() {
  return (
    <CryptoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </CryptoProvider>
  );
}

export default App;
