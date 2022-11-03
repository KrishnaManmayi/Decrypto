import React, { useState, useContext } from "react";
import styles from "./Navbar.module.css";
import { GiAbstract021 } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

import { NavLink, Link } from "react-router-dom";

import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

import { CryptoContext } from "../store/CryptoContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency, updateCurrency } = useContext(CryptoContext);

  const menuToggleHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const changeCurrencyHandler = (event) => {
    updateCurrency(event.target.value);
  };

  return (
    <div className={styles.navbar + " main-container"}>
      <header>
        <div className={styles.iconMain}>
          <IconContext.Provider value={{ size: "2rem", title: "Decrypto" }}>
            <GiAbstract021 />
          </IconContext.Provider>
          <Link to="/">
            <p>Decrypto</p>
          </Link>
        </div>
        <div>
          <Select
            value={currency}
            onChange={changeCurrencyHandler}
            style={{ width: 100, height: 40, marginLeft: 15 }}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </div>
        <div>
          <button
            className={styles.responsive + " " + styles.active}
            onClick={menuToggleHandler}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <nav className={isMenuOpen ? styles.active : ""}>
        <NavLink
          to="/cryptocurrencies"
          className={({ isActive }) =>
            isActive ? `${styles.navElementActive}` : ""
          }>
          Cryptocurrencies
        </NavLink>
        <NavLink
          to="/exchanges"
          className={({ isActive }) =>
            isActive ? `${styles.navElementActive}` : ""
          }>
          Exchanges
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive ? `${styles.navElementActive}` : ""
          }>
          News
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
