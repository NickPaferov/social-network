import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  getUserProfileTC,
  setCurrentUserProfileAC,
} from "../../bll/profile-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { setAppErrorAC } from "../../bll/app-reducer";
import {
  selectAuthedUserId,
  selectCurrentUserId,
  selectCurrentUserProfile,
} from "../../utils/selectors";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUserProfile = useAppSelector(selectCurrentUserProfile);
  const authedUserId = useAppSelector(selectAuthedUserId);
  const currentUserId = useAppSelector(selectCurrentUserId);

  const { userId } = useParams(); // string || undefined

  useEffect(() => {
    if (!authedUserId) {
      navigate("/login");
    } else {
      dispatch(getUserProfileTC(userId ? parseInt(userId) : authedUserId));
    }
    return () => {
      dispatch(setCurrentUserProfileAC(null));
      dispatch(setAppErrorAC(null));
    };
  }, [dispatch, navigate, authedUserId, userId]);

  if (!currentUserProfile) {
    return <div className={styles.content}>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <ProfileInfo />
      {authedUserId === currentUserId && <MyPosts />}
    </div>
  );
};
