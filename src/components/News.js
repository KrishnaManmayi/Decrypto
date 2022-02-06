import React from "react";
import { NewsApi } from "../api/api";
import useFetch from "../api/useFetch";
import styles from "./News.module.css";
import { CircularProgress } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import NewsImage from "../assets/images/undraw_newspaper.svg";
import moment from "moment";

const News = () => {
  const { data, loading, error } = useFetch(...NewsApi());

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
    const newsList = data.value;
    console.log(newsList);

    return (
      <div className="main-container">
        <div className={styles.headerImage}>
          <img src={NewsImage} alt="news-icon" />
          <h4>Get latest cryptocurrency news</h4>
        </div>
        <div className={styles.newsContainer}>
          {newsList.map((newsItem, index) => {
            if (newsItem.image) {
              return (
                <div className={styles.newsBox} key={index}>
                  <div className={styles.header}>
                    <img
                      src={newsItem.image.thumbnail.contentUrl}
                      alt="newsImg"
                    />
                    <h3>
                      {newsItem.name + " - "}
                      <span style={{ fontStyle: "italic", color: "gray" }}>
                        {newsItem.provider[0].name}
                      </span>
                    </h3>
                  </div>
                  <div className={styles.body}>
                    <p>{HTMLReactParser(newsItem.description)}</p>
                  </div>
                  <div className={styles.footer}>
                    <p>
                      {moment(newsItem.datePublished).startOf("ss").fromNow()}
                    </p>
                    <a
                      href={newsItem.url}
                      target="_balnk"
                      rel="noreferrer"
                      color="#3861fb">
                      Read More..
                    </a>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return "Something is wrong. Please try later";
  }
};

export default News;
