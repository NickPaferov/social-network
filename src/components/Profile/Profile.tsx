import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { getUserProfileTC, setUserProfileAC } from "../../bll/profile-reducer";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector((state) => state.profilePage.userProfile);
  const authedUserId = useAppSelector((state) => state.auth.id);
  const currentUserId = useAppSelector((state) => state.profilePage.userProfile?.userId);

  const { userId } = useParams(); // string || undefined

  useEffect(() => {
    dispatch(getUserProfileTC(userId ? parseInt(userId) : 24855));
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
