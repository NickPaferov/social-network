const initialState = {
  dialogs: [
    { id: 1, name: "Alexey" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Artem" },
    { id: 4, name: "Denis" },
    { id: 5, name: "Dmitry" },
    { id: 6, name: "Ilya" },
    { id: 7, name: "Nikita" },
    { id: 8, name: "Sergey" },
  ] as DialogType[],
  messages: [
    { id: 1, messageText: "Hi!" },
    { id: 2, messageText: "How are you?" },
    { id: 3, messageText: "I have news!" },
  ] as MessageType[],
};

export const dialogsReducer = (
  state = initialState,
  action: DialogsActionsType
): InitialStateType => {
  switch (action.type) {
    case "SEND-MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

export const sendMessageAC = (message: MessageType) => ({ type: "SEND-MESSAGE", message } as const);

export type DialogType = {
  id: number;
  name: string;
};
export type MessageType = {
  id: number;
  messageText: string;
};
type InitialStateType = typeof initialState;
export type DialogsActionsType = ReturnType<typeof sendMessageAC>;
