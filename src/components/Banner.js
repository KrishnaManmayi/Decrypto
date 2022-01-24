import React, { useContext } from "react";
import CryptoPortfolioImage from "./../assets/images/undraw_crypto_portfolio.svg";
import styles from "./Banner.module.css";

import TrendingCarousel from "./TrendingCarousel";
import TrendingCoin from "./TrendingCoin";
import { MdLocalFireDepartment } from "react-icons/md";

import { CryptoContext } from "../store/CryptoContext";

import useFetch from "../api/useFetch";
import { TrendingCoinsApi } from "../api/api";

import CircularProgress from "@mui/material/CircularProgress";
import { style } from "@mui/system";

const Banner = () => {
  const { currency } = useContext(CryptoContext);
  const trendingCoinsResponse = useFetch(TrendingCoinsApi(currency));
  const trendingCoins = trendingCoinsResponse.data;
  const isLoading = trendingCoinsResponse.loading;
  return (
    <div className={styles.banner + " main-container"}>
      <div className={styles.left}>
        <img src={CryptoPortfolioImage} alt="BannerImage" />
      </div>
      <div className={styles.right}>
        <h2>
          Trending Cryptocurrencies by Market Cap
          <MdLocalFireDepartment />
        </h2>
        {isLoading ? (
          <div className={styles.loading}>
            <CircularProgress />
            <CircularProgress />
          </div>
        ) : (
          <TrendingCarousel>
            {trendingCoins.map((coin) => (
              <TrendingCoin key={coin.id} coin={coin} />
            ))}
          </TrendingCarousel>
        )}
      </div>
    </div>
  );
};

export default Banner;
