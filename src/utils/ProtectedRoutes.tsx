import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../bll/store";

type PropsType = {
  userIsAuth: boolean;
  redirectTo: string;
};

export const ProtectedRoutes: FC<PropsType> = ({ userIsAuth, redirectTo }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return isAuth === userIsAuth ? <Outlet /> : <Navigate to={redirectTo} />;
};
