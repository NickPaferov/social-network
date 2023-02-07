import React from "react";
import styles from "./Dialogs.module.css";

export const Dialogs = () => {
  return (
    <div className={styles.content}>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>
          <div className={styles.dialog}>Alexey</div>
          <div className={styles.dialog}>Andrew</div>
          <div className={styles.dialog}>Artem</div>
          <div className={styles.dialog}>Denis</div>
          <div className={styles.dialog}>Dmitry</div>
          <div className={styles.dialog}>Ilya</div>
          <div className={styles.dialog}>Nikita</div>
          <div className={styles.dialog}>Sergey</div>
        </div>
      </div>
      <div className={styles.messages}>
        <div className={styles.message}>Hi!</div>
        <div className={styles.message}>How are you?</div>
        <div className={styles.message}>I have news!</div>
      </div>
    </div>
  );
};
