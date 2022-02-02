import React, { useState } from "react";
import styles from "./OptionsBar.module.css";

const OptionsBar = ({
  options,
  initialSelectedButtonIndex,
  updateSelectedOption,
}) => {
  const [selectedButtonIndex, setselectedButtonIndex] = useState(
    initialSelectedButtonIndex
  );
  const selectOptionHandler = (index) => {
    setselectedButtonIndex(index);
    updateSelectedOption(index);
  };
  return (
    <div className={styles.optionsBar}>
      {options.map((option, index) => {
        const classes =
          index === selectedButtonIndex ? `${styles.selectedButton}` : "";
        return (
          <button
            className={classes}
            onClick={selectOptionHandler.bind(null, index)}>
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default OptionsBar;
