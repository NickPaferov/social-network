import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ProfileActionsType, profileReducer } from "./profile-reducer";
import { DialogsActionsType, dialogsReducer } from "./dialogs-reducer";
import { UsersActionsType, usersReducer } from "./users-reducer";
import { AppActionsType, appReducer } from "./app-reducer";
import { AuthActionsType, authReducer } from "./auth-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

type AppRootActionsType =
  | AuthActionsType
  | AppActionsType
  | ProfileActionsType
  | DialogsActionsType
  | UsersActionsType;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionsType
>;

export type DispatchType = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppRootActionsType
>;

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

//@ts-ignore
window.store = store;
