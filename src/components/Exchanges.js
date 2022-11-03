import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import ExchangesList from "./ExchangesList";

const Exchanges = () => {
    return (
        <div className="main-container">
            <CurrencyConverter />
            <ExchangesList />
        </div>
    );
};

export default Exchanges;
