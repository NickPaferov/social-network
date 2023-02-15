import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { getUserProfileTC, setUserProfileAC } from "../../bll/profile-reducer";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userProfile = useAppSelector((state) => state.profilePage.userProfile);
  const authedUserId = useAppSelector((state) => state.auth.id);
  const currentUserId = useAppSelector((state) => state.profilePage.userProfile?.userId);

  const { userId } = useParams(); // string || undefined

  useEffect(() => {
    if (!authedUserId) {
      navigate("/login");
    } else {
      dispatch(getUserProfileTC(userId ? parseInt(userId) : authedUserId));
    }
    return () => {
      dispatch(setUserProfileAC(null));
    };
  }, [dispatch, navigate, authedUserId, userId]);

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
