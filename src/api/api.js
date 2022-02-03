export const TrendingCoinsApi = (currency) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
};
export const CoinsListApi = (currency) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d`;
};
export const CoinApi = (coinId) => {
  return `https://api.coingecko.com/api/v3/coins/${coinId}`;
};
export const HistoricalDataApi = (coinId, currency, days) => {
  return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
};
export const NewsApi = () => {
  return [
    "https://bing-news-search1.p.rapidapi.com/news/search",
    JSON.stringify({
      params: {
        q: "cryptocurrency",
        count: "100",
        freshness: "Week",
        textFormat: "Html",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    }),
  ];
};
