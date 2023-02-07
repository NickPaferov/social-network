import React, { FC } from "react";
import styles from "../Dialogs.module.css";

type PropsType = {
  name: string;
};

export const DialogItem: FC<PropsType> = ({ name }) => {
  return <div className={styles.dialog}>{name}</div>;
};
