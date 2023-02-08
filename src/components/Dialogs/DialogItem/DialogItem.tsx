import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./DialogItem.module.css";

type PropsType = {
  id: number;
  name: string;
};

export const DialogItem: FC<PropsType> = ({ id, name }) => {
  return (
    <NavLink to={`/dialogs/${id}`} className={styles.dialog}>
      {name}
    </NavLink>
  );
};
