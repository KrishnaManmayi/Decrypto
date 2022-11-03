import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress,
    TableContainer,
} from "@mui/material";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { ExchangesListApi } from "../api/api";
import useFetch from "../api/useFetch";
import styles from "./ExchangesList.module.css";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { styled } from "@mui/material/styles";

const TableCellStyled = styled(TableCell)(() => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
}));

const ExchangesList = () => {
    const pageLimit = 10;
    const [pageNumber, setPageNumber] = useState(1);
    const [exchangesList, setExchangesList] = useState([]);
    const { data, loading, error } = useFetch(ExchangesListApi(10, pageNumber));
    console.log(data);
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1,
    };

    const observer = useRef();
    const lastElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && pageNumber < pageLimit) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            }, options);
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    useEffect(() => {
        setExchangesList((prevExchangesList) => [
            ...new Set([...prevExchangesList, ...data]),
        ]);
    }, [data]);

    return (
        <div className={styles.exchangesList}>
            <h3>ExchangesList</h3>
            {exchangesList && Object.keys(exchangesList).length !== 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exchange</TableCell>
                                <TableCell>Trust Score</TableCell>
                                <TableCell>Trade Volume (24h)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exchangesList.map((entry, index) => {
                                if (index === exchangesList.length - 1) {
                                    return (
                                        <TableRow
                                            ref={lastElementRef}
                                            key={entry.name}>
                                            <TableCellStyled>
                                                <img
                                                    src={entry.image}
                                                    alt="exchange-image"
                                                />
                                                <span>{entry.name}</span>
                                                <a
                                                    href={entry.url}
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    <BsBoxArrowUpRight />
                                                </a>
                                            </TableCellStyled>
                                            <TableCell>
                                                <span>{entry.trust_score}</span>
                                            </TableCell>
                                            <TableCell>
                                                ₿{" "}
                                                {entry.trade_volume_24h_btc.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                } else {
                                    return (
                                        <TableRow key={entry.name}>
                                            <TableCellStyled>
                                                <img
                                                    src={entry.image}
                                                    alt="exchange-image"
                                                />
                                                <span>{entry.name}</span>
                                                <a
                                                    href={entry.url}
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    <BsBoxArrowUpRight />
                                                </a>
                                            </TableCellStyled>
                                            <TableCell>
                                                <span>{entry.trust_score}</span>
                                            </TableCell>
                                            <TableCell>
                                                ₿{" "}
                                                {entry.trade_volume_24h_btc.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <div className={styles.loading}>
                {loading && <CircularProgress />}
            </div>
            {error && <p>Something went wrong. Please try later.</p>}
        </div>
    );
};

export default ExchangesList;
