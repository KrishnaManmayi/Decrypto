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
import { styled } from "@mui/material/styles";
import { currencyFormatter } from "../utils/currencyFormatter";
import { Line } from "react-chartjs-2";

const TableRowStyled = styled(TableRow)(() => ({
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#e9ecef",
    cursor: "pointer",
  },
}));

const TableCellStyled = styled(TableCell)(() => ({
  fontSize: "1rem",
  fontWeight: "bold",
}));

const TableCellLineChartStyled = styled(TableCell)(() => ({
  width: "120px",
  canvas: {
    width: "50px",
    height: "30px",
  },
}));

const columns = [
  {
    id: "rank",
    label: "#",
  },
  {
    id: "coin",
    label: "Coin",
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

const Cryptocurrencies = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const { currency } = useContext(CryptoContext);
  const { data, error, loading } = useFetch(CoinsListApi(currency));
  const [rows, setRows] = useState([]);
  console.log(data);

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
  const rowClickHandler = (coinId) => {
    navigate(`/currency/${coinId}`);
  };

  useEffect(() => {
    setPage(0);
    searchHandler();
  }, [data, searchInput]);

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
          <div></div>
        </div>
        <TableContainer sx={{ width: "95%", margin: "auto" }}>
          {loading ? (
            <div className={styles.progressBars}>
              <LinearProgress />
              <LinearProgress sx={{ width: "75%" }} />
              <LinearProgress sx={{ width: "50%" }} />
            </div>
          ) : error ? (
            <h3>Something went wrong. Try again later</h3>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        color: "gray",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((rowData) => (
                    <TableRowStyled
                      key={rowData.id}
                      onClick={rowClickHandler.bind(null, rowData.id)}>
                      <TableCellStyled>
                        {rowData.market_cap_rank}
                      </TableCellStyled>
                      <TableCellStyled>
                        <div className={styles.coin}>
                          <span className={styles.coinImage}>
                            <img src={rowData.image} alt="" />
                          </span>
                          <span>{rowData.name}</span>
                          <span className={styles.coinSymbol}>
                            {rowData.symbol}
                          </span>
                        </div>
                      </TableCellStyled>
                      <TableCellStyled>
                        {currencyFormatter(currency, rowData.current_price)}
                      </TableCellStyled>
                      <TableCellStyled>
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
                      </TableCellStyled>
                      <TableCellStyled>
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
                      </TableCellStyled>
                      <TableCellStyled>
                        {currencyFormatter(currency, rowData.market_cap)}
                      </TableCellStyled>
                      <TableCellLineChartStyled>
                        {
                          <Line
                            data={{
                              labels: [
                                ...Array(
                                  rowData.sparkline_in_7d.price.length
                                ).keys(),
                              ],
                              datasets: [
                                {
                                  data: rowData.sparkline_in_7d.price,
                                  borderColor: "#ef5959",
                                  borderWidth: 2,
                                  tension: 1,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              elements: {
                                point: {
                                  radius: 0,
                                },
                              },
                              scales: {
                                y: {
                                  display: false,
                                },
                                x: {
                                  display: false,
                                },
                              },
                              plugins: {
                                legend: {
                                  display: false,
                                },
                              },
                              events: [],
                            }}
                          />
                        }
                      </TableCellLineChartStyled>
                    </TableRowStyled>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
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
