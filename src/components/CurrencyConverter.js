import React, { useEffect, useState } from "react";
import { CurrencyExchangeRateApi } from "../api/api";
import useFetch from "../api/useFetch";
import { CircularProgress, MenuItem } from "@mui/material";
import styles from "./CurrencyConverter.module.css";
import { Select, TextField } from "@mui/material";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const currencyList = ["BTC", "ETH", "BNB", "ADA", "SOL", "XRP", "DOT", "LUNA"];

const CurrencyConverter = ({ parentStyles }) => {
    const [primaryCurrency, setPrimaryCurrency] = useState("BTC");
    const [secondaryCurrency, setSecondaryCurrency] = useState("ETH");
    const [primaryCurrencyValue, setPrimaryCurrencyValue] = useState(1);
    const [secondaryCurrencyValue, setSecondaryCurrencyValue] = useState("");
    const { data, loading, error } = useFetch(
        ...CurrencyExchangeRateApi(primaryCurrency, secondaryCurrency)
    );

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
                    data?.["Realtime Currency Exchange Rate"]?.[
                        "5. Exchange Rate"
                    ]
            );
        }
    }, [data, primaryCurrencyValue]);

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
                            .filter(
                                (currency) => currency !== secondaryCurrency
                            )
                            .map((currency) => (
                                <MenuItem value={currency} key={currency}>
                                    {currency}
                                </MenuItem>
                            ))}
                    </Select>
                </div>
                <div className={styles.arrowImg}>
                    <BsFillArrowRightCircleFill size="1x" />
                </div>
                <div className={styles.currencyBox}>
                    <p>Secondary Currency</p>
                    <TextField
                        type="number"
                        value={secondaryCurrencyValue}
                        disabled
                    />
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
                <p>Exchange Rate</p>
                <h3>
                    {primaryCurrency} to {secondaryCurrency}
                </h3>
                {loading && <CircularProgress />}
                {data && Object.keys(data).length !== 0 && (
                    <div>
                        <p>
                            {
                                data?.["Realtime Currency Exchange Rate"]?.[
                                    "5. Exchange Rate"
                                ]
                            }
                        </p>
                    </div>
                )}
                {error ? <p style={{ color: "red" }}>Please try later</p> : ""}
            </div>
        </div>
    );
};

export default CurrencyConverter;
