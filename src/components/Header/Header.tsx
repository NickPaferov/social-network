import React from "react";
import styles from "./Header.module.css";
import logoImg from "../../assets/images/logo.jpg";
import defaultPhoto from "../../assets/images/defaultPhoto.jpg";
import { Preloader } from "../common/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { useNavigate } from "react-router-dom";
import { logoutTC } from "../../bll/auth-reducer";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const login = useAppSelector((state) => state.auth.login);
  const authedUserPhoto = useAppSelector((state) => state.auth.authedUserProfile?.photos.large);

  const handleLogout = () => {
    dispatch(logoutTC());
  };

  const handleMoveToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <span className={styles.text}>In t</span>
        <img className={styles.logoImg} src={logoImg} alt="logo" />
        <span className={styles.text}>uch</span>
      </div>
      {isRequestProcessing && <Preloader />}
      {isAuth ? (
        <div className={styles.user}>
          <span className={styles.logIn}>{login}</span>
          <img
            className={styles.ava}
            src={authedUserPhoto ? authedUserPhoto : defaultPhoto}
            alt="avatar"
          />
          <button onClick={handleLogout} disabled={isRequestProcessing}>
            LogOut
          </button>
        </div>
      ) : (
        <button onClick={handleMoveToLoginPage}>LogIn</button>
      )}
    </div>
  );
};
