import React, { FC } from "react";
import { followUserTC, unfollowUserTC } from "../../../bll/users-reducer";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { Button } from "../Button/Button";
import {
  selectPaginationParamsLoadingStatus,
  selectUsersInFollowingProcess,
} from "../../../utils/selectors";

type PropsType = {
  followed: boolean;
  userId: number;
};

export const FollowUnfollow: FC<PropsType> = ({ followed, userId }) => {
  const dispatch = useAppDispatch();

  const isPaginationParamsLoading = useAppSelector(
    selectPaginationParamsLoadingStatus
  );
  const usersInFollowingProcess = useAppSelector(selectUsersInFollowingProcess);

  const handleUnfollowUser = () => {
    dispatch(unfollowUserTC(userId));
  };

  const handleFollowUser = () => {
    dispatch(followUserTC(userId));
  };

  const isDisabledBtn =
    isPaginationParamsLoading ||
    usersInFollowingProcess.some((id) => id === userId);

  return (
    <div>
      {followed ? (
        <Button
          title={"Unfollow"}
          disabled={isDisabledBtn}
          handleClick={handleUnfollowUser}
        />
      ) : (
        <Button
          title={"Follow"}
          disabled={isDisabledBtn}
          handleClick={handleFollowUser}
        />
      )}
    </div>
  );
};
