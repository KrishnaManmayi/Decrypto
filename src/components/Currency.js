import React from "react";
import { useParams } from "react-router-dom";

const Currency = () => {
  const params = useParams();
  return <div>{params.currencySymbol}</div>;
};

export default Currency;
