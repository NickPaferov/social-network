import { DispatchType } from "./store";
import { authMeTC } from "./auth-reducer";

const initialState = {
  isInitialized: false,
  isRequestProcessing: false,
};

export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-IS-INITIALIZED": {
      return { ...state, isInitialized: action.isInitialized };
    }
    case "APP/SET-IS-REQUEST-PROCESSING-STATUS": {
      return { ...state, isRequestProcessing: action.isRequestProcessing };
    }
    default:
      return state;
  }
};

export const setIsInitializedAC = (isInitialized: boolean) =>
  ({
    type: "APP/SET-IS-INITIALIZED",
    isInitialized,
  } as const);

export const setIsRequestProcessingStatusAC = (isRequestProcessing: boolean) =>
  ({
    type: "APP/SET-IS-REQUEST-PROCESSING-STATUS",
    isRequestProcessing,
  } as const);

export const initializeAppTC = () => (dispatch: DispatchType) => {
  const promise = dispatch(authMeTC());
  promise.then(() => {
    dispatch(setIsInitializedAC(true));
  });
};

type InitialStateType = typeof initialState;
export type AppActionsType =
  | ReturnType<typeof setIsInitializedAC>
  | ReturnType<typeof setIsRequestProcessingStatusAC>;
