import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./DialogItem.module.css";

type PropsType = {
  id: number;
  name: string;
};

type IsActiveType = {
  isActive: boolean;
};

export const DialogItem: FC<PropsType> = ({ id, name }) => {
  const setActive = ({ isActive }: IsActiveType) =>
    isActive ? `${styles.dialog} ${styles.activeDialog}` : styles.dialog;

  return (
    <NavLink to={`/dialogs/${id}`} className={setActive}>
      {name}
    </NavLink>
  );
};
