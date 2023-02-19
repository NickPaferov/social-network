import React, { FC } from "react";
import styles from "./Button.module.css";

type PropsType = {
  title: string;
  disabled?: boolean;
  handleClick?: () => void;
};

export const Button: FC<PropsType> = ({ title, disabled, handleClick }) => {
  return (
    <button className={styles.btn} disabled={disabled} onClick={handleClick}>
      {title}
    </button>
  );
};
