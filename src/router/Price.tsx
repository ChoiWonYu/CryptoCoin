import React from "react";
import { useLoaderData, useLocation } from "react-router-dom";
const Price = () => {
  const price = useLocation().state.price;
  return <div>Price : {price}$</div>;
};

export default Price;
