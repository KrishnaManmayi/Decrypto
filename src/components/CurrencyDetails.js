import React, { useContext, useState } from "react";
import styles from "./CurrencyDetails.module.css";
import useFetch from "../api/useFetch";
import HTMLReactParser from "html-react-parser";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { CoinApi } from "../api/api";
import { CryptoContext } from "../store/CryptoContext";
import { AiFillThunderbolt } from "react-icons/ai";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import LineChart from "./LineChart";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import OptionsBar from "./UI/OptionsBar";
import { optionToDays } from "../utils/optionToDays";
import { optionToType } from "../utils/optionToType";

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

const priceChangeStyled = (priceChange) =>
  priceChange >= 0 ? (
    <span style={{ color: "#1dd15a" }}>
      <MdArrowDropUp fontSize="large" />
      {Math.abs(priceChange).toFixed(2)}%
    </span>
  ) : (
    <span style={{ color: "#ef5959" }}>
      <MdArrowDropDown fontSize="large" />
      {Math.abs(priceChange).toFixed(2)}%
    </span>
  );

const Currency = () => {
  const params = useParams();
  const { currency } = useContext(CryptoContext);
  const currencyFormatter =
    currency === "USD" ? UsCurrencyFormatter : IndiaCurrencyFormatter;
  const coinId = params.coinId;
  const { data, loading, error } = useFetch(CoinApi(coinId));
  const [typeOption, setTypeOption] = useState(0);
  const [daysOption, setDaysOption] = useState(1);
  console.log(data);

  const typeOptionUpdateHandler = (index) => {
    setTypeOption(index);
  };

  const daysOptionUpdateHandler = (index) => {
    setDaysOption(index);
  };

  if (loading) {
    return (
      <div className={styles.progress}>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return "Error";
  }
  if (data && Object.keys(data).length !== 0) {
    const statistics = [
      { title: "Market Cap Rank", value: `#${data.market_cap_rank}` },
      {
        title: "24h High",
        value: `${currencyFormatter.format(
          data.market_data.high_24h[currency.toLowerCase()]
        )}`,
      },
      {
        title: "24h Low",
        value: `${currencyFormatter.format(
          data.market_data.low_24h[currency.toLowerCase()]
        )}`,
      },
      { title: "Liquidity Score", value: `${data.liquidity_score}` },
      {
        title: "Circulating Supply",
        value: `${data.market_data.circulating_supply}`,
      },
      {
        title: "Price Change% (24h)",
        value: priceChangeStyled(
          data.market_data.price_change_percentage_24h_in_currency[
            currency.toLowerCase()
          ]
        ),
      },
      {
        title: "Price Change % (7d)",
        value: priceChangeStyled(
          data.market_data.price_change_percentage_7d_in_currency[
            currency.toLowerCase()
          ]
        ),
      },
      {
        title: "Price Change % (30d)",
        value: priceChangeStyled(
          data.market_data.price_change_percentage_30d_in_currency[
            currency.toLowerCase()
          ]
        ),
      },
      {
        title: "Price Change % (1y)",
        value: priceChangeStyled(
          data.market_data.price_change_percentage_1y_in_currency[
            currency.toLowerCase()
          ]
        ),
      },
      {
        title: "Market Cap Change % (24h)",
        value: priceChangeStyled(
          data.market_data.market_cap_change_percentage_24h_in_currency[
            currency.toLowerCase()
          ]
        ),
      },
    ];

    return (
      <div className="main-container">
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
            <p>
              {HTMLReactParser(
                data.description["en"].split(". ")[0] +
                  ". " +
                  data.description["en"].split(". ")[1] +
                  "."
              )}
            </p>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoInnerBox}>
              <p>
                <RiMoneyCnyCircleFill />
                Current Price
                <span style={{ fontSize: "0.9rem", marginLeft: "5px" }}>
                  {priceChangeStyled(
                    data.market_data.price_change_percentage_24h_in_currency[
                      currency.toLowerCase()
                    ]
                  )}
                </span>
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
                <span style={{ fontSize: "0.9rem", marginLeft: "5px" }}>
                  {priceChangeStyled(
                    data.market_data
                      .market_cap_change_percentage_24h_in_currency[
                      currency.toLowerCase()
                    ]
                  )}
                </span>
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
                <OptionsBar
                  options={["Price", "Market Cap"]}
                  initialSelectedButtonIndex={0}
                  updateSelectedOption={typeOptionUpdateHandler}
                />
                <OptionsBar
                  options={["Day", "Week", "Month", "Year"]}
                  initialSelectedButtonIndex={1}
                  updateSelectedOption={daysOptionUpdateHandler}
                />
              </div>
              <LineChart
                coinId={coinId}
                currency={currency}
                days={optionToDays(daysOption)}
                type={optionToType(typeOption)}
              />
            </div>
            <div className={styles.statisticsBox}>
              <header>
                <img src={data.image["thumb"]} alt={data.id + " image"} />
                <span style={{ color: "rgba(0,0,0,0.7)", fontWeight: "bold" }}>
                  {data.symbol.toUpperCase()}
                </span>
                <span style={{ fontWeight: "bold" }}>Coin Statistics</span>
              </header>
              <main>
                {statistics.map((entry) => (
                  <div
                    key={entry.title}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "1.5rem auto",
                    }}>
                    <span style={{ color: "gray" }}>{entry.title}</span>
                    <span>{entry.value}</span>
                  </div>
                ))}
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Something is wrong. Please try later";
  }
};

export default Currency;
