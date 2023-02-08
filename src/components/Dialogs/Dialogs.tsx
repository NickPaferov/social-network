import React from "react";
import styles from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";

export const Dialogs = () => {
  const dialogs = [
    { id: 1, name: "Alexey" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Artem" },
    { id: 4, name: "Denis" },
    { id: 5, name: "Dmitry" },
    { id: 6, name: "Ilya" },
    { id: 7, name: "Nikita" },
    { id: 8, name: "Sergey" },
  ];

  const messages = [
    { id: 1, messageText: "Hi!" },
    { id: 2, messageText: "How are you?" },
    { id: 3, messageText: "I have news!" },
  ];

  return (
    <div className={styles.content}>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>
          {dialogs.map((dialog) => (
            <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />
          ))}
        </div>
      </div>
      <div className={styles.messages}>
        {messages.map((message) => (
          <Message key={message.id} messageText={message.messageText} />
        ))}
      </div>
    </div>
  );
};
