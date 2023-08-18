import React from "react";
import styles from "./Header.module.css";
import logoImg from "../../assets/images/logo.jpg";
import defaultPhoto from "../../assets/images/defaultPhoto.jpg";
import {Preloader} from "../common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useNavigate} from "react-router-dom";
import {logoutTC} from "../../bll/auth-reducer";
import {Button} from "../common/Button/Button";
import {AppError} from "../common/AppError/AppError";
import {
    selectAuthedUserProfile,
    selectAuthStatus,
    selectRequestProcessingStatus,
} from "../../utils/selectors";

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
    const isAuth = useAppSelector(selectAuthStatus);
    const authedUserProfile = useAppSelector(selectAuthedUserProfile);

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
                <img className={styles.logoImg} src={logoImg} alt="logo"/>
                <span className={styles.text}>uch</span>
            </div>
            {isRequestProcessing && <div className={styles.preloader}><Preloader/></div>}
            <AppError/>
            {isAuth ? (
                <div className={styles.authedUser}>
                    <span className={styles.authedUserName}>{authedUserProfile?.fullName}</span>
                    <img
                        className={styles.ava}
                        src={
                            authedUserProfile?.photos.large
                                ? authedUserProfile.photos.large
                                : authedUserProfile?.photos.small
                                    ? authedUserProfile.photos.small
                                    : defaultPhoto
                        }
                        alt="avatar"
                    />
                    <Button title={"LogOut"} disabled={isRequestProcessing} handleClick={handleLogout}/>
                </div>
            ) : (
                <div className={styles.logInBtn}>
                    <Button
                        title={"LogIn"}
                        disabled={isRequestProcessing}
                        handleClick={handleMoveToLoginPage}
                    />
                </div>
            )}
        </div>
    );
};
