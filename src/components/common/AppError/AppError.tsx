import React from "react";
import styles from "./AppError.module.css";
import { useAppSelector } from "../../../bll/store";

export const AppError = () => {
  const appError = useAppSelector((state) => state.app.appError);

  return <div>{appError && <div className={styles.error}>{appError}</div>}</div>;
};
