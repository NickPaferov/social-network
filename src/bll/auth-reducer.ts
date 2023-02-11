import { AuthUserDataType } from "../api/api";

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-AUTH-USER-DATA":
      return { ...state, ...action.data, isAuth: true };
    default:
      return state;
  }
};

export const setAuthUserDataAC = (data: AuthUserDataType) => ({
  type: "AUTH/SET-AUTH-USER-DATA",
  data,
});

type InitialStateType = typeof initialState;

export type AuthActionsType = ReturnType<typeof setAuthUserDataAC>;
