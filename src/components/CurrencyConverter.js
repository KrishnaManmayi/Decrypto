import React, { useEffect, useState } from "react";
import { CurrencyExchangeRateApi } from "../api/api";
import useFetch from "../api/useFetch";
import { CircularProgress, MenuItem } from "@mui/material";
import styles from "./CurrencyConverter.module.css";
import { Select, TextField } from "@mui/material";
import IfIcon from "../assets/images/if.png";

const currencyList = [
  "BTC",
  "ETH",
  "USDT",
  "BNB",
  "USDC",
  "ADA",
  "SOL",
  "XRP",
  "DOT",
  "LUNA",
];

const CurrencyConverter = () => {
  const [primaryCurrency, setPrimaryCurrency] = useState("BTC");
  const [secondaryCurrency, setSecondaryCurrency] = useState("ETH");
  const [primaryCurrencyValue, setPrimaryCurrencyValue] = useState(1);
  const [secondaryCurrencyValue, setSecondaryCurrencyValue] = useState("");
  const { data, loading, error } = useFetch(
    ...CurrencyExchangeRateApi(primaryCurrency, secondaryCurrency)
  );
  console.log(data);

  const primaryCurrencyChangeHandler = (event) => {
    setPrimaryCurrency(event.target.value);
  };
  const secondaryCurrencyChangeHandler = (event) => {
    setSecondaryCurrency(event.target.value);
  };

  const primaryCurrencyValueChangeHandler = (event) => {
    setPrimaryCurrencyValue(event.target.value);
  };

  useEffect(() => {
    if (data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"]) {
      setSecondaryCurrencyValue(
        primaryCurrencyValue *
          data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"]
      );
    }
  }, [data, primaryCurrencyValue]);

  if (error) {
    return "Error";
  }
  return (
    <div className={styles.converterBox}>
      <div className={styles.selectorBox}>
        <div className={styles.currencyBox}>
          <p>Primary Currency</p>
          <TextField
            type="number"
            value={primaryCurrencyValue}
            inputProps={{ min: "0" }}
            onChange={primaryCurrencyValueChangeHandler}
          />
          <Select
            value={primaryCurrency}
            onChange={primaryCurrencyChangeHandler}>
            {currencyList
              .filter((currency) => currency !== secondaryCurrency)
              .map((currency) => (
                <MenuItem value={currency} key={currency}>
                  {currency}
                </MenuItem>
              ))}
          </Select>
        </div>
        <img src={IfIcon} alt="if" />
        <div className={styles.currencyBox}>
          <p>Secondary Currency</p>
          <TextField type="number" value={secondaryCurrencyValue} disabled />
          <Select
            value={secondaryCurrency}
            onChange={secondaryCurrencyChangeHandler}>
            {currencyList
              .filter((currency) => currency !== primaryCurrency)
              .map((currency) => (
                <MenuItem value={currency} key={currency}>
                  {currency}
                </MenuItem>
              ))}
          </Select>
        </div>
      </div>
      <div className={styles.resultBox}>
        <h2>Exchange Rate</h2>
        {loading && <CircularProgress />}
        {data && Object.keys(data).length !== 0 && (
          <div>
            <h3>
              {data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"]}
            </h3>
          </div>
        )}
        <p>
          {primaryCurrency} to {secondaryCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
