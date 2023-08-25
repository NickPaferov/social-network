import { authAPI } from "../api/auth-api";
import { profileAPI } from "../api/profile-api";
import { AppThunkType } from "./store";
import { setIsRequestProcessingStatusAC } from "./app-reducer";
import { securityAPI } from "../api/security-api";
import { setAuthedUserProfileAC } from "./profile-reducer";
import { handleError } from "../utils/error-util";

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  loginError: null as string | null,
  captchaUrl: null as string | null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-AUTH-USER-DATA":
      return { ...state, ...action.payload };
    case "AUTH/SET-LOGIN-ERROR":
      return { ...state, loginError: action.loginError };
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
export const setLoginErrorAC = (loginError: string | null) =>
  ({ type: "AUTH/SET-LOGIN-ERROR", loginError } as const);
export const setCaptchaUrlAC = (captchaUrl: string | null) =>
  ({ type: "AUTH/SET-CAPTCHA", captchaUrl } as const);

export const authMeTC = (): AppThunkType => async (dispatch) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  try {
    const response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(setAuthUserDataAC(id, login, email, true));
      const res = await profileAPI.getUserProfile(response.data.data.id);
      dispatch(setAuthedUserProfileAC(res.data));
    }
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setIsRequestProcessingStatusAC(false));
  }
};

export const loginTC =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): AppThunkType =>
  async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
      const response = await authAPI.login(
        email,
        password,
        rememberMe,
        captcha
      );
      if (response.data.resultCode === 0) {
        dispatch(authMeTC());
        dispatch(setLoginErrorAC(null));
        dispatch(setCaptchaUrlAC(null));
      }
      if (response.data.resultCode === 1) {
        dispatch(setLoginErrorAC(response.data.messages[0]));
      }
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC());
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const getCaptchaUrlTC = (): AppThunkType => async (dispatch) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  try {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrlAC(response.data.url));
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setIsRequestProcessingStatusAC(false));
  }
};

export const logoutTC = (): AppThunkType => async (dispatch) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  try {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, false));
      dispatch(setAuthedUserProfileAC(null));
    }
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setIsRequestProcessingStatusAC(false));
  }
};

type InitialStateType = typeof initialState;

export type AuthActionsType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof setCaptchaUrlAC>
  | ReturnType<typeof setLoginErrorAC>;
