import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { api } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { setUserProfileAC } from "../../bll/profile-reducer";
import { setIsRequestProcessingStatusAC } from "../../bll/app-reducer";
import { useParams } from "react-router-dom";
import { FollowUnfollow } from "../common/FollowUnfollow/FollowUnfollow";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector((state) => state.profilePage.userProfile);
  const authedUserId = useAppSelector((state) => state.auth.id);
  const currentUserId = useAppSelector((state) => state.profilePage.userProfile?.userId);
  const users = useAppSelector((state) => state.usersPage.users);

  const { userId } = useParams(); // string || undefined

  useEffect(() => {
    dispatch(setIsRequestProcessingStatusAC(true));
    api.getUserProfile(userId ? parseInt(userId) : 24855).then((response) => {
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
      {authedUserId === currentUserId ? (
        <MyPosts />
      ) : (
        <FollowUnfollow
          followed={users.filter((user) => user.id === currentUserId)[0].followed}
          userId={userId ? +userId : 24855}
        />
      )}
    </div>
  );
};
