import React from "react";
import styles from "./AppError.module.css";
import { useAppSelector } from "../../../bll/store";
import { selectAppError } from "../../../utils/selectors";

export const AppError = () => {
  const appError = useAppSelector(selectAppError);

  return <div>{appError && <div className={styles.error}>{appError}</div>}</div>;
};
