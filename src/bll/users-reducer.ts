import { usersAPI, UserType } from "../api/users-api";
import { setIsRequestProcessingStatusAC } from "./app-reducer";
import { AppThunkType, DispatchType } from "./store";
import { followAPI } from "../api/follow-api";
import { handleError } from "../utils/error-util";

const initialState = {
  users: [] as UserType[],
  totalUsersCount: 0,
  currentPage: 1,
  usersCountPerPage: 5,
  isPaginationParamsLoading: false,
  isFollowProcessing: false,
  usersInFollowingProcess: [] as number[],
};

export const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {
  switch (action.type) {
    case "USERS/SET-USERS":
      return { ...state, users: action.users };
    case "USERS/FOLLOW-USER":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: true } : u)),
      };
    case "USERS/UNFOLLOW-USER":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: false } : u)),
      };
    case "USERS/SET-TOTAL-USERS-COUNT":
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case "USERS/SET-CURRENT-PAGE":
      return { ...state, currentPage: action.currentPage };
    case "USERS/SET-USERS-COUNT-PER-PAGE":
      return { ...state, usersCountPerPage: action.usersCountPerPage };
    case "USERS/SET-IS-PAGINATION-PARAMS-LOADING-STATUS":
      return { ...state, isPaginationParamsLoading: action.isPaginationParamsLoading };
    case "USERS/SET-USERS-IN-FOLLOWING-PROCESS":
      return {
        ...state,
        usersInFollowingProcess: action.isFollowProcessing
          ? [...state.usersInFollowingProcess, action.userId]
          : state.usersInFollowingProcess.filter((userId) => userId !== action.userId),
      };
    default:
      return state;
  }
};

export const setUsersAC = (users: UserType[]) => ({ type: "USERS/SET-USERS", users } as const);
export const followUserAC = (userId: number) => ({ type: "USERS/FOLLOW-USER", userId } as const);
export const unfollowUserAC = (userId: number) =>
  ({ type: "USERS/UNFOLLOW-USER", userId } as const);
export const setTotalUsersCountAC = (totalUsersCount: number) =>
  ({ type: "USERS/SET-TOTAL-USERS-COUNT", totalUsersCount } as const);
export const setCurrentPageAC = (currentPage: number) =>
  ({ type: "USERS/SET-CURRENT-PAGE", currentPage } as const);
export const setUsersCountPerPageAC = (usersCountPerPage: number) =>
  ({ type: "USERS/SET-USERS-COUNT-PER-PAGE", usersCountPerPage } as const);
export const setIsPaginationParamsLoadingAC = (isPaginationParamsLoading: boolean) =>
  ({ type: "USERS/SET-IS-PAGINATION-PARAMS-LOADING-STATUS", isPaginationParamsLoading } as const);
export const setUsersInFollowingProcessAC = (isFollowProcessing: boolean, userId: number) =>
  ({ type: "USERS/SET-USERS-IN-FOLLOWING-PROCESS", isFollowProcessing, userId } as const);

export const getUsersTC =
  (currentPage: number, usersCountPerPage: number): AppThunkType =>
  async (dispatch: DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    dispatch(setIsPaginationParamsLoadingAC(true));
    try {
      const response = await usersAPI.getUsers(currentPage, usersCountPerPage);
      dispatch(setUsersAC(response.data.items));
      dispatch(setTotalUsersCountAC(response.data.totalCount));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setIsPaginationParamsLoadingAC(false));
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const followUserTC =
  (userId: number): AppThunkType =>
  async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    dispatch(setUsersInFollowingProcessAC(true, userId));
    try {
      const response = await followAPI.follow(userId);
      if (response.data.resultCode === 0) {
        dispatch(followUserAC(userId));
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setUsersInFollowingProcessAC(false, userId));
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

export const unfollowUserTC =
  (userId: number): AppThunkType =>
  async (dispatch: DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    dispatch(setUsersInFollowingProcessAC(true, userId));
    try {
      const response = await followAPI.unfollow(userId);
      if (response.data.resultCode === 0) {
        dispatch(unfollowUserAC(userId));
      }
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setUsersInFollowingProcessAC(false, userId));
      dispatch(setIsRequestProcessingStatusAC(false));
    }
  };

type InitialStateType = typeof initialState;
export type UsersActionsType =
  | ReturnType<typeof followUserAC>
  | ReturnType<typeof unfollowUserAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setUsersCountPerPageAC>
  | ReturnType<typeof setIsPaginationParamsLoadingAC>
  | ReturnType<typeof setUsersInFollowingProcessAC>;
