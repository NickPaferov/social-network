import React, { FC } from "react";
import styles from "./FollowUnfollow.module.css";
import { followUserAC, unfollowUserAC } from "../../../bll/users-reducer";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { setIsRequestProcessingStatusAC } from "../../../bll/app-reducer";
import { followAPI } from "../../../api/follow-api";

type PropsType = {
  followed: boolean;
  userId: number;
};

export const FollowUnfollow: FC<PropsType> = ({ followed, userId }) => {
  const dispatch = useAppDispatch();

  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const handleUnfollowUser = () => {
    dispatch(setIsRequestProcessingStatusAC(true));
    followAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowUserAC(userId));
        dispatch(setIsRequestProcessingStatusAC(false));
      }
    });
  };

  const handleFollowUser = () => {
    dispatch(setIsRequestProcessingStatusAC(true));
    followAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followUserAC(userId));
        dispatch(setIsRequestProcessingStatusAC(false));
      }
    });
  };

  return (
    <div>
      {followed ? (
        <button className={styles.btn} disabled={isRequestProcessing} onClick={handleUnfollowUser}>
          Unfollow
        </button>
      ) : (
        <button className={styles.btn} disabled={isRequestProcessing} onClick={handleFollowUser}>
          Follow
        </button>
      )}
    </div>
  );
};
