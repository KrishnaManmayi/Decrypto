import React, { useContext } from "react";
import styles from "./TrendingCoin.module.css";
import { currencyFormatter } from "../utils/currencyFormatter";
import { CryptoContext } from "./../store/CryptoContext";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

const TrendingCoin = (props) => {
  const { currency } = useContext(CryptoContext);
  const coin = props.coin;
  const priceChange = coin.price_change_percentage_24h;
  const priceChangeIcon =
    priceChange >= 0 ? (
      <MdArrowDropUp fontSize="large" />
    ) : (
      <MdArrowDropDown fontSize="large" />
    );

  return (
    <div className={styles.coinContainer}>
      <div className={styles.item1}>
        <img src={coin.image} alt="coin" />
      </div>
      <div className={styles.item2}>
        <p>{coin.symbol}</p>
        <p>#{coin.market_cap_rank}</p>
      </div>
      <div className={styles.item3}>
        <p>{coin.name}</p>
        <p>{currencyFormatter(currency, coin.current_price)}</p>
      </div>
      <div className={styles.item4}>
        <p className={priceChange >= 0 ? styles.increase : styles.decrease}>
          {priceChangeIcon}
          {Math.abs(priceChange).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TrendingCoin;
