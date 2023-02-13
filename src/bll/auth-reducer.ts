import { authAPI, AuthUserDataType } from "../api/auth-api";
import { profileAPI, UserProfileResponseType } from "../api/profile-api";
import { DispatchType } from "./store";
import { setIsRequestProcessingStatusAC } from "./app-reducer";

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

export const authMeTC = () => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  authAPI.authMe().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserDataAC(response.data.data));
      profileAPI.getUserProfile(response.data.data.id).then((response) => {
        dispatch(setAuthedUserProfileAC(response.data));
      });
    }
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

type InitialStateType = typeof initialState;

export type AuthActionsType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof setAuthedUserProfileAC>;
