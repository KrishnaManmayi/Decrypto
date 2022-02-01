import React, { useContext } from "react";
import styles from "./CurrencyDetails.module.css";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { CoinApi } from "../api/api";
import useFetch from "../api/useFetch";
import HTMLReactParser from "html-react-parser";
import { CryptoContext } from "../store/CryptoContext";
import { AiFillThunderbolt } from "react-icons/ai";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import LineChart from "./LineChart";

const UsCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

const IndiaCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
});

const Currency = () => {
  const params = useParams();
  const { currency } = useContext(CryptoContext);
  const currencyFormatter =
    currency === "USD" ? UsCurrencyFormatter : IndiaCurrencyFormatter;
  const coinId = params.coinId;
  const { data, loading, error } = useFetch(CoinApi(coinId));
  console.log(data);
  return (
    <div className="main-container">
      {loading ? (
        <div className={styles.progress}>
          <CircularProgress />
        </div>
      ) : error ? (
        "Error"
      ) : data && Object.keys(data).length !== 0 ? (
        <div className={styles.currency}>
          <div className={styles.headerBox}>
            <div className={styles.coinMain}>
              <img src={data.image["small"]} alt={data.id + " image"} />
              <div className={styles.title}>
                {data.id + "  "}
                <a target="_blank" href={data.links.homepage[0]}>
                  <BsBoxArrowUpRight />
                </a>
              </div>
            </div>
            <p>{HTMLReactParser(data.description["en"].split(". ")[0])}</p>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoInnerBox}>
              <p>
                <RiMoneyCnyCircleFill />
                Current Price
              </p>
              <p>
                {currencyFormatter.format(
                  data.market_data.current_price[currency.toLowerCase()]
                )}
              </p>
            </div>
            <div className={styles.infoInnerBox}>
              <p>
                <GiMoneyStack />
                Market Cap
              </p>
              <p>
                {currencyFormatter.format(
                  data.market_data.market_cap[currency.toLowerCase()]
                )}
              </p>
            </div>
            <div className={styles.infoInnerBox}>
              <p>
                <AiFillThunderbolt />
                Total Volume
              </p>
              <p>
                {currencyFormatter.format(
                  data.market_data.total_volume[currency.toLowerCase()]
                )}
              </p>
            </div>
          </div>
          <div className={styles.centerBox}>
            <div className={styles.lineChartBox}>
              <div className={styles.optionsBox}>
                <div className={styles.type}>
                  <span>Price</span>
                  <span>Market Cap</span>
                </div>
                <div className={styles.days}>
                  <span>Day</span>
                  <span>Week</span>
                  <span>Month</span>
                  <span>Year</span>
                </div>
              </div>
              <LineChart coinId={coinId} currency={currency} days={365} />
            </div>
            <div className={styles.statisticsBox}>
              <header>
                <img src={data.image["thumb"]} alt={data.id + " image"} />
              </header>
            </div>
          </div>
        </div>
      ) : (
        "Something went wrong. Please try later"
      )}
    </div>
  );
};

export default Currency;
