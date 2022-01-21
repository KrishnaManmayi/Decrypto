import { createContext, useState } from "react";

export const CryptoContext = createContext();

const CryptoProvider = (props) => {
  const [currency, setCurrency] = useState("USD");

  const updateCurrency = (currencySelected) => {
    setCurrency(currencySelected);
  };

  return (
    <CryptoContext.Provider value={{ currency, updateCurrency }}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
