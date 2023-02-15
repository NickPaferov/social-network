import { authAPI } from "../api/auth-api";
import { profileAPI, UserProfileResponseType } from "../api/profile-api";
import { DispatchType } from "./store";
import { setIsRequestProcessingStatusAC } from "./app-reducer";
import { securityAPI } from "../api/security-api";

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  authedUserProfile: null as UserProfileResponseType | null,
  captchaUrl: null as string | null,
};

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-AUTH-USER-DATA":
      return { ...state, ...action.payload };
    case "AUTH/SET-AUTHED-USER-PROFILE":
      return { ...state, authedUserProfile: action.authedUserProfile };
    case "AUTH/SET-CAPTCHA":
      return { ...state, captchaUrl: action.captchaUrl };
    default:
      return state;
  }
};

export const setAuthUserDataAC = (
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
) =>
  ({
    type: "AUTH/SET-AUTH-USER-DATA",
    payload: {
      id,
      login,
      email,
      isAuth,
    },
  } as const);
export const setAuthedUserProfileAC = (authedUserProfile: UserProfileResponseType | null) =>
  ({ type: "AUTH/SET-AUTHED-USER-PROFILE", authedUserProfile } as const);
export const setCaptchaUrlAC = (captchaUrl: string | null) =>
  ({ type: "AUTH/SET-CAPTCHA", captchaUrl } as const);

export const authMeTC = () => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  return authAPI.authMe().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(setAuthUserDataAC(id, login, email, true));
      profileAPI.getUserProfile(response.data.data.id).then((response) => {
        dispatch(setAuthedUserProfileAC(response.data));
      });
    }
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

export const loginTC =
  (email: string, password: string, rememberMe: boolean, captcha: string) =>
  (dispatch: DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    authAPI.login(email, password, rememberMe, captcha).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(authMeTC());
        dispatch(setCaptchaUrlAC(null));
      }
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC());
      }
      dispatch(setIsRequestProcessingStatusAC(false));
    });
  };

export const getCaptchaUrlTC = () => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  securityAPI.getCaptchaUrl().then((response) => {
    dispatch(setCaptchaUrlAC(response.data.url));
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

export const logoutTC = () => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, false));
      dispatch(setAuthedUserProfileAC(null));
    }
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

type InitialStateType = typeof initialState;

export type AuthActionsType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof setAuthedUserProfileAC>
  | ReturnType<typeof setCaptchaUrlAC>;
