import React from "react";
import { Line } from "react-chartjs-2";
import { HistoricalDataApi } from "../api/api";
import useFetch from "../api/useFetch";
import styles from "./LineChart.module.css";
import { CircularProgress } from "@mui/material";
import { currencyFormatter } from "../utils/currencyFormatter";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinId, currency, days, type }) => {
  const { data, loading, error } = useFetch(
    HistoricalDataApi(coinId, currency, days)
  );

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
    const label =
      days === 1
        ? `${type.toUpperCase()} ( Past ${days} Day ) in ${currency}`
        : `${type.toUpperCase()} ( Past ${days} Days ) in ${currency}`;
    const chartData = type === "market_caps" ? data.market_caps : data.prices;
    return (
      <Line
        data={{
          labels: chartData.map((price) => {
            let date = new Date(price[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: chartData.map((price) => price[1]),
              label: label,
              borderColor: "#ef5959",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
    );
  } else {
    return "Something is wrong. Please try later";
  }
};

export default LineChart;
