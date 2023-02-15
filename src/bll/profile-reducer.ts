import { profileAPI, UserProfileResponseType } from "../api/profile-api";
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
  userProfile: null as UserProfileResponseType | null,
  userStatus: "",
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    case "PROFILE/ADD-POST":
      return { ...state, posts: [action.post, ...state.posts] };
    case "PROFILE/SET-USER-PROFILE":
      return { ...state, userProfile: action.userProfile };
    case "PROFILE/SET-USER-STATUS":
      return { ...state, userStatus: action.userStatus };
    default:
      return state;
  }
};

export const addPostAC = (post: PostType) => ({ type: "PROFILE/ADD-POST", post } as const);
export const setUserProfileAC = (userProfile: UserProfileResponseType | null) =>
  ({ type: "PROFILE/SET-USER-PROFILE", userProfile } as const);
export const setUserStatusAC = (userStatus: string) =>
  ({ type: "PROFILE/SET-USER-STATUS", userStatus } as const);

export const getUserProfileTC = (userId: number) => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  profileAPI.getUserProfile(userId).then((response) => {
    dispatch(setUserProfileAC(response.data));
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

export const updateUserStatusTC = (userStatus: string) => (dispatch: DispatchType) => {
  dispatch(setIsRequestProcessingStatusAC(true));
  profileAPI.updateUserStatus(userStatus).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserStatusAC(userStatus));
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
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setUserStatusAC>;