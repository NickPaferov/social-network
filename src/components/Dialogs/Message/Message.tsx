import React, { FC } from "react";

type PropsType = {
  messageText: string;
};

export const Message: FC<PropsType> = ({ messageText }) => {
  return <div>{messageText}</div>;
};
