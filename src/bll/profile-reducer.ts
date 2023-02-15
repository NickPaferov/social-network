import { profileAPI, UserPhotosType, UserProfileResponseType } from "../api/profile-api";
import { DispatchType } from "./store";
import { setIsRequestProcessingStatusAC } from "./app-reducer";

const initialState = {
  posts: [
    { id: 1, postText: "Post5", likesCount: 11 },
    { id: 2, postText: "Post4", likesCount: 7 },
    { id: 3, postText: "Post3", likesCount: 16 },
    { id: 4, postText: "Post2", likesCount: 5 },
    { id: 5, postText: "Post1", likesCount: 10 },
  ] as PostType[],
  currentUserProfile: null as UserProfileResponseType | null,
  userStatus: "",
  authedUserProfile: null as UserProfileResponseType | null,
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

export const getUserProfileTC = (userId: number) => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  profileAPI.getUserProfile(userId).then((response) => {
    dispatch(setCurrentUserProfileAC(response.data));
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

export const getUserStatusTC = (userId: number) => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  profileAPI.getUserStatus(userId).then((response) => {
    dispatch(setUserStatusAC(response.data));
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

export const updateAuthedUserStatusTC = (userStatus: string) => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  profileAPI.updateUserStatus(userStatus).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserStatusAC(userStatus));
    }
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

export const updateAuthedUserPhotoTC = (file: any) => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  profileAPI.updateUserPhoto(file).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthedUserPhotoAC(response.data.data.photos));
    }
    dispatch(setIsRequestProcessingStatusAC(false));
  });
};

type PostType = {
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
  | SetAuthedUserProfileType;

export type SetAuthedUserProfileType = ReturnType<typeof setAuthedUserProfileAC>;
