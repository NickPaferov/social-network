import { UserType } from "../api/api";

const initialState = {
  users: [] as UserType[],
};

export const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {
  switch (action.type) {
    case "SET-USERS":
      return { ...state, users: [...state.users, ...action.users] };
    case "FOLLOW-USER":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: true } : u)),
      };
    case "UNFOLLOW-USER":
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: false } : u)),
      };
    default:
      return state;
  }
};

export const followUserAC = (userId: number) => ({ type: "FOLLOW-USER", userId } as const);
export const unfollowUserAC = (userId: number) => ({ type: "UNFOLLOW-USER", userId } as const);
export const setUsersAC = (users: UserType[]) => ({ type: "SET-USERS", users } as const);

type InitialStateType = typeof initialState;
export type UsersActionsType =
  | ReturnType<typeof followUserAC>
  | ReturnType<typeof unfollowUserAC>
  | ReturnType<typeof setUsersAC>;
