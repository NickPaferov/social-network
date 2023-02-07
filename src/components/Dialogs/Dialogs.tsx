import React from "react";
import styles from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";

export const Dialogs = () => {
  return (
    <div className={styles.content}>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>
          <DialogItem name={"Alexey"} />
          <DialogItem name={"Andrew"} />
          <DialogItem name={"Artem"} />
          <DialogItem name={"Denis"} />
          <DialogItem name={"Dmitry"} />
          <DialogItem name={"Ilya"} />
          <DialogItem name={"Nikita"} />
          <DialogItem name={"Sergey"} />
        </div>
      </div>
      <div className={styles.messages}>
        <Message message={"Hi!"} />
        <Message message={"How are you?"} />
        <Message message={"I have news!"} />
      </div>
    </div>
  );
};
