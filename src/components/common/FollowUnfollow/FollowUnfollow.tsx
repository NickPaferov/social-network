import React, { FC } from "react";
import styles from "./FollowUnfollow.module.css";
import { followUserTC, unfollowUserTC } from "../../../bll/users-reducer";
import { useAppDispatch, useAppSelector } from "../../../bll/store";

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
    dispatch(unfollowUserTC(userId));
  };

  const handleFollowUser = () => {
    dispatch(followUserTC(userId));
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
