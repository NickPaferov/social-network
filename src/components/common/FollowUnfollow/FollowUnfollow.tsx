import React, { FC } from "react";
import styles from "./FollowUnfollow.module.css";
import {
  followUserAC,
  setUsersInFollowingProcessAC,
  unfollowUserAC,
} from "../../../bll/users-reducer";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { setIsRequestProcessingStatusAC } from "../../../bll/app-reducer";
import { followAPI } from "../../../api/follow-api";

type PropsType = {
  followed: boolean;
  userId: number;
};

export const FollowUnfollow: FC<PropsType> = ({ followed, userId }) => {
  const dispatch = useAppDispatch();

  const isPaginationParamsLoading = useAppSelector(
    (state) => state.usersPage.isPaginationParamsLoading
  );
  const usersInFollowingProcess = useAppSelector(
    (state) => state.usersPage.usersInFollowingProcess
  );

  const handleUnfollowUser = () => {
    dispatch(setIsRequestProcessingStatusAC(true));
    dispatch(setUsersInFollowingProcessAC(true, userId));
    followAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowUserAC(userId));
        dispatch(setUsersInFollowingProcessAC(false, userId));
        dispatch(setIsRequestProcessingStatusAC(false));
      }
    });
  };

  const handleFollowUser = () => {
    dispatch(setIsRequestProcessingStatusAC(true));
    dispatch(setUsersInFollowingProcessAC(true, userId));
    followAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followUserAC(userId));
        dispatch(setUsersInFollowingProcessAC(false, userId));
        dispatch(setIsRequestProcessingStatusAC(false));
      }
    });
  };

  return (
    <div>
      {followed ? (
        <button
          className={styles.btn}
          disabled={
            isPaginationParamsLoading || usersInFollowingProcess.some((id) => id === userId)
          }
          onClick={handleUnfollowUser}
        >
          Unfollow
        </button>
      ) : (
        <button
          className={styles.btn}
          disabled={
            isPaginationParamsLoading || usersInFollowingProcess.some((id) => id === userId)
          }
          onClick={handleFollowUser}
        >
          Follow
        </button>
      )}
    </div>
  );
};
