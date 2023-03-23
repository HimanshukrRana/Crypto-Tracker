import React, { useContext, useEffect } from "react";
import { createContext } from "react";

const initialValue = {};

const Crypto = createContext(initialValue);

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = React.useState("INR");
  const [symbol, setSymbol] = React.useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, setSymbol, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
