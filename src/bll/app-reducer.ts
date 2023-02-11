const initialState = {
  isRequestProcessing: false,
};

export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-IS-REQUEST-PROCESSING-STATUS": {
      return { ...state, isRequestProcessing: action.isRequestProcessing };
    }
    default:
      return state;
  }
};

export const setIsRequestProcessingStatusAC = (isRequestProcessing: boolean) =>
  ({
    type: "APP/SET-IS-REQUEST-PROCESSING-STATUS",
    isRequestProcessing,
  } as const);

type InitialStateType = typeof initialState;
export type AppActionsType = ReturnType<typeof setIsRequestProcessingStatusAC>;
