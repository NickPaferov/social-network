import {
  profileAPI,
  UpdateProfileParamsType,
  UserPhotosType,
  UserProfileResponseType,
} from "../api/profile-api";
import { AppRootStateType, AppThunkType } from "./store";
import { setIsRequestProcessingStatusAC } from "./app-reducer";
import { handleError } from "../utils/error-util";

const initialState = {
  posts: [
    { id: 3, postText: "Ready to take on a new challenge", likesCount: 19 },
    { id: 2, postText: "Chose React and Redux", likesCount: 17 },
    { id: 1, postText: "Starting to learn Javascript", likesCount: 25 },
  ] as PostType[],
  currentUserProfile: null as UserProfileResponseType | null,
  userStatus: "",
  authedUserProfile: null as UserProfileResponseType | null,
  statusError: null as string | null,
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    case "PROFILE/ADD-POST":
      return { ...state, posts: [action.post, ...state.posts] };
    case "PROFILE/SET-CURRENT-USER-PROFILE":
      return { ...state, currentUserProfile: action.currentUserProfile };
    case "PROFILE/SET-AUTHED-USER-PROFILE":
      return { ...state, authedUserProfile: action.authedUserProfile };
    case "PROFILE/SET-USER-STATUS":
      return { ...state, userStatus: action.userStatus };
    case "PROFILE/SET-AUTHED-USER-PHOTO":
      return {
        ...state,
        authedUserProfile: state.authedUserProfile
          ? { ...state.authedUserProfile, photos: action.photos }
          : state.authedUserProfile,
      };
    case "PROFILE/SET-STATUS-ERROR":
      return { ...state, statusError: action.statusError };
    default:
      return state;
  }
};

export const addPostAC = (post: PostType) => ({ type: "PROFILE/ADD-POST", post } as const);
export const setCurrentUserProfileAC = (currentUserProfile: UserProfileResponseType | null) =>
  ({ type: "PROFILE/SET-CURRENT-USER-PROFILE", currentUserProfile } as const);
export const setAuthedUserProfileAC = (authedUserProfile: UserProfileResponseType | null) =>
  ({ type: "PROFILE/SET-AUTHED-USER-PROFILE", authedUserProfile } as const);
export const setUserStatusAC = (userStatus: string) =>
  ({ type: "PROFILE/SET-USER-STATUS", userStatus } as const);
export const setAuthedUserPhotoAC = (photos: UserPhotosType) =>
  ({ type: "PROFILE/SET-AUTHED-USER-PHOTO", photos } as const);
export const setStatusErrorAC = (statusError: string | null) =>
  ({ type: "PROFILE/SET-STATUS-ERROR", statusError } as const);

export const getUserProfileTC =
  (userId: number): AppThunkType =>
  async (dispatch, getState: () => AppRootStateType) => {
    const authedUserId = getState().auth.id;
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
      const response = await profileAPI.getUserProfile(userId);
      dispatch(setCurrentUserProfileAC(response.data));
      if (userId === authedUserId) {
        dispatch(setAuthedUserProfileAC(response.data));
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const getUserStatusTC =
  (userId: number): AppThunkType =>
  async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
      const response = await profileAPI.getUserStatus(userId);
      dispatch(setUserStatusAC(response.data));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const updateAuthedUserStatusTC =
  (userStatus: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
      const response = await profileAPI.updateUserStatus(userStatus);
      if (response.data.resultCode === 0) {
        dispatch(setStatusErrorAC(null));
        dispatch(setUserStatusAC(userStatus));
      }
      if (response.data.resultCode === 1) {
        dispatch(setStatusErrorAC(response.data.messages[0]));
        setTimeout(() => {
          dispatch(setStatusErrorAC(null));
        }, 3000);
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const updateAuthedUserPhotoTC =
  (file: any): AppThunkType =>
  async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
      const response = await profileAPI.updateUserPhoto(file);
      if (response.data.resultCode === 0) {
        dispatch(setAuthedUserPhotoAC(response.data.data.photos));
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const updateAuthedUserProfileTC =
  (profile: UpdateProfileParamsType): AppThunkType =>
  async (dispatch, getState: () => AppRootStateType) => {
    const userId = getState().profilePage.authedUserProfile?.userId;
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
      const response = await profileAPI.updateUserProfile(profile);
      if (response.data.resultCode === 0 && userId) {
        dispatch(getUserProfileTC(userId));
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
type InitialStateType = typeof initialState;
export type ProfileActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setCurrentUserProfileAC>
  | ReturnType<typeof setUserStatusAC>
  | ReturnType<typeof setAuthedUserPhotoAC>
  | ReturnType<typeof setStatusErrorAC>
  | SetAuthedUserProfileType;

export type SetAuthedUserProfileType = ReturnType<typeof setAuthedUserProfileAC>;
