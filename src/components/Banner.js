import React, { useContext } from "react";
import CryptoPortfolioImage from "./../assets/images/undraw_crypto_portfolio.svg";
import styles from "./Banner.module.css";

import TrendingCarousel from "./TrendingCarousel";
import TrendingCoin from "./TrendingCoin";
import { MdLocalFireDepartment } from "react-icons/md";

import { CryptoContext } from "../store/CryptoContext";

import useFetch from "../api/useFetch";
import { TrendingCoinsApi } from "../api/api";

const Banner = () => {
  const { currency } = useContext(CryptoContext);
  const trendingCoinsList = useFetch(TrendingCoinsApi(currency));
  const trendingCoins = trendingCoinsList.data;

  return (
    <div className={styles.banner + " main-container"}>
      <div className={styles.left}>
        <img src={CryptoPortfolioImage} alt="BannerImage" />
      </div>
      <div className={styles.right}>
        <h2>
          Trending now
          <MdLocalFireDepartment />
        </h2>
        <TrendingCarousel>
          {trendingCoins.map((coin) => (
            <TrendingCoin key={coin.id} coin={coin} />
          ))}
        </TrendingCarousel>
      </div>
    </div>
  );
};

export default Banner;
