import React, { ChangeEvent, useState } from "react";
import styles from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { sendMessageAC } from "../../bll/dialogs-reducer";

export const Dialogs = () => {
  const dispatch = useAppDispatch();

  const [newMessageText, setNewMessageText] = useState("");

  const dialogs = useAppSelector((state) => state.dialogsPage.dialogs);
  const messages = useAppSelector((state) => state.dialogsPage.messages);

  const handleChangeNewMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageText(e.currentTarget.value);
  };

  const handleAddMessage = () => {
    if (newMessageText.trim().length) {
      dispatch(sendMessageAC({ id: messages.length + 1, messageText: newMessageText }));
      setNewMessageText("");
    }
  };

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
        <div className={styles.messageArea}>
          <textarea
            autoFocus
            placeholder="Enter your message"
            value={newMessageText}
            onChange={handleChangeNewMessageText}
          />
          <button className={styles.btn} onClick={handleAddMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
