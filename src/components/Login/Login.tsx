import React from "react";
import styles from "./Login.module.css";
import { useAppSelector } from "../../bll/store";

export const Login = () => {
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  return (
    <div className={styles.content}>
      {isRequestProcessing ? <span>Loading...</span> : <span>LOGIN</span>}
    </div>
  );
};
