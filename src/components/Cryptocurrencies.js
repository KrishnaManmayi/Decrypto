import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  LinearProgress,
} from "@mui/material";
import styles from "./Cryptocurrencies.module.css";
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";

import { CoinsListApi } from "../api/api";
import useFetch from "../api/useFetch";
import { CryptoContext } from "../store/CryptoContext";

const columns = [
  {
    id: "rank",
    label: "#",
  },
  {
    id: "coin",
    label: "Coin",
    style: { position: "sticky", left: 0, zIndex: 10 },
  },
  {
    id: "price",
    label: "Price",
  },
  {
    id: "24_hours_percentage",
    label: "24hr %",
  },
  {
    id: "7_days_percentage",
    label: "7d %",
  },
  {
    id: "marketcap",
    label: "Market Cap",
  },
  {
    id: "last_7_days",
    label: "Last 7 days",
  },
];

const UsCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const IndiaCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const Cryptocurrencies = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const { currency } = useContext(CryptoContext);
  const { data, error, loading } = useFetch(CoinsListApi(currency));
  const [rows, setRows] = useState([]);
  const currencyFormatter =
    currency === "USD" ? UsCurrencyFormatter : IndiaCurrencyFormatter;

  useEffect(() => {
    setPage(0);
    searchHandler();
  }, [data, searchInput]);

  const onSearchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };
  const searchHandler = () => {
    setRows(
      data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchInput) ||
          coin.symbol.toLowerCase().includes(searchInput)
      )
    );
  };
  const priceChangeIcon = (priceChange) => {
    const icon =
      priceChange >= 0 ? (
        <MdArrowDropUp fontSize="large" />
      ) : (
        <MdArrowDropDown fontSize="large" />
      );
    return icon;
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rowClickHandler = (coinSymbol) => {
    navigate(`/currency/${coinSymbol}`);
  };

  return (
    <div className="main-container">
      <div className={styles.currenciesSection}>
        <div className={styles.searchCoin}>
          <input
            type="text"
            placeholder="Search for a coin"
            value={searchInput}
            onChange={onSearchInputChangeHandler}
          />
        </div>
        <TableContainer sx={{ width: "100%", maxHeight: "90vh" }}>
          {loading ? (
            <div className={styles.progressBars}>
              <LinearProgress />
              <LinearProgress sx={{ width: "75%" }} />
              <LinearProgress sx={{ width: "50%" }} />
            </div>
          ) : error ? (
            <h3>Something went wrong. Try again later</h3>
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={column.style}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((rowData) => (
                    <TableRow
                      key={rowData.id}
                      onClick={rowClickHandler.bind(null, rowData.symbol)}
                      className={styles.tablerow}>
                      <TableCell>{rowData.market_cap_rank}</TableCell>
                      <TableCell
                        style={{
                          position: "sticky",
                          left: 0,
                        }}>
                        <div className={styles.coin}>
                          <span className={styles.coinImage}>
                            <img src={rowData.image} alt="" />
                          </span>
                          <span className={styles.coinName}>
                            {rowData.name}
                          </span>
                          <span className={styles.coinSymbol}>
                            {rowData.symbol}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {currencyFormatter.format(rowData.current_price)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            rowData.price_change_percentage_24h_in_currency >= 0
                              ? styles.increase
                              : styles.decrease
                          }>
                          {priceChangeIcon(
                            rowData.price_change_percentage_24h_in_currency
                          )}
                          {Math.abs(
                            rowData.price_change_percentage_24h_in_currency
                          ).toFixed(2)}
                          %
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            rowData.price_change_percentage_7d_in_currency >= 0
                              ? styles.increase
                              : styles.decrease
                          }>
                          {priceChangeIcon(
                            rowData.price_change_percentage_7d_in_currency
                          )}
                          {Math.abs(
                            rowData.price_change_percentage_7d_in_currency
                          ).toFixed(2)}
                          %
                        </span>
                      </TableCell>
                      <TableCell>
                        {currencyFormatter.format(rowData.market_cap)}
                      </TableCell>
                      <TableCell>{}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Cryptocurrencies;
