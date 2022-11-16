import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Coins from "./router/Coins";
import Coin from "./router/Coin";
import Price from "./router/Price";
import Chart from "./router/Chart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
