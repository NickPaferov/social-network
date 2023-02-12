import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { setUserProfileAC } from "../../bll/profile-reducer";
import { setIsRequestProcessingStatusAC } from "../../bll/app-reducer";
import { useParams } from "react-router-dom";
import { profileAPI } from "../../api/profile-api";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector((state) => state.profilePage.userProfile);
  const authedUserId = useAppSelector((state) => state.auth.id);
  const currentUserId = useAppSelector((state) => state.profilePage.userProfile?.userId);

  const { userId } = useParams(); // string || undefined

  useEffect(() => {
    dispatch(setIsRequestProcessingStatusAC(true));
    profileAPI.getUserProfile(userId ? parseInt(userId) : 24855).then((response) => {
      dispatch(setUserProfileAC(response.data));
      dispatch(setIsRequestProcessingStatusAC(false));
    });
    return () => {
      dispatch(setUserProfileAC(null));
    };
  }, [dispatch, userId]);

  if (!userProfile) {
    return <div className={styles.content}>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <ProfileInfo />
      {authedUserId === currentUserId && <MyPosts />}
    </div>
  );
};
