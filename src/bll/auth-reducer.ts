import { AuthUserDataType, UserProfileResponseType } from "../api/api";

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  authedUserProfile: null as UserProfileResponseType | null,
};

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-AUTH-USER-DATA":
      return { ...state, ...action.data, isAuth: true };
    case "AUTH/SET-AUTHED-USER-PROFILE":
      return { ...state, authedUserProfile: action.authedUserProfile };
    default:
      return state;
  }
};

export const setAuthUserDataAC = (data: AuthUserDataType) =>
  ({
    type: "AUTH/SET-AUTH-USER-DATA",
    data,
  } as const);
export const setAuthedUserProfileAC = (authedUserProfile: UserProfileResponseType | null) =>
  ({ type: "AUTH/SET-AUTHED-USER-PROFILE", authedUserProfile } as const);

type InitialStateType = typeof initialState;

export type AuthActionsType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof setAuthedUserProfileAC>;
