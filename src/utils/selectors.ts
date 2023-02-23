import { AppRootStateType } from "../bll/store";
import { DialogType, MessageType } from "../bll/dialogs-reducer";
import { UserPhotosType, UserProfileResponseType } from "../api/profile-api";
import { PostType } from "../bll/profile-reducer";
import { UserType } from "../api/users-api";

// auth-selectors
export const selectAuthedUserId = (state: AppRootStateType): number | null => state.auth.id;
export const selectAuthStatus = (state: AppRootStateType): boolean => state.auth.isAuth;
export const selectCaptchaUrl = (state: AppRootStateType): string | null => state.auth.captchaUrl;
export const selectLoginError = (state: AppRootStateType): string | null => state.auth.loginError;

// app-selectors
export const selectAppInitStatus = (state: AppRootStateType): boolean => state.app.isInitialized;
export const selectAppError = (state: AppRootStateType): string | null => state.app.appError;
export const selectRequestProcessingStatus = (state: AppRootStateType) =>
  state.app.isRequestProcessing;

// dialogs-selectors
export const selectDialogs = (state: AppRootStateType): DialogType[] => state.dialogsPage.dialogs;
export const selectMessages = (state: AppRootStateType): MessageType[] =>
  state.dialogsPage.messages;

// profile-selectors
export const selectPaginationParamsLoadingStatus = (state: AppRootStateType): boolean =>
  state.usersPage.isPaginationParamsLoading;
export const selectUsersInFollowingProcess = (state: AppRootStateType): number[] =>
  state.usersPage.usersInFollowingProcess;
export const selectAuthedUserProfile = (state: AppRootStateType): UserProfileResponseType | null =>
  state.profilePage.authedUserProfile;
export const selectCurrentUserProfile = (state: AppRootStateType): UserProfileResponseType | null =>
  state.profilePage.currentUserProfile;
export const selectCurrentUserId = (state: AppRootStateType): number | undefined =>
  state.profilePage.currentUserProfile?.userId;
export const selectUserStatus = (state: AppRootStateType): string => state.profilePage.userStatus;
export const selectStatusError = (state: AppRootStateType): string | null =>
  state.profilePage.statusError;
export const selectPosts = (state: AppRootStateType): PostType[] => state.profilePage.posts;
export const selectAuthedUserProfilePhotos = (
  state: AppRootStateType
): UserPhotosType | undefined => state.profilePage.authedUserProfile?.photos;

// users-selectors
export const selectUsers = (state: AppRootStateType): UserType[] => state.usersPage.users;
export const selectTotalUsersCount = (state: AppRootStateType): number =>
  state.usersPage.totalUsersCount;
export const selectCurrentPage = (state: AppRootStateType): number => state.usersPage.currentPage;
export const selectUsersCountPerPage = (state: AppRootStateType): number =>
  state.usersPage.usersCountPerPage;
