import React, { FC } from "react";
import styles from "./User.module.css";
import defaultPhoto from "../../../assets/images/defaultPhoto.jpg";
import { FollowUnfollow } from "../../common/FollowUnfollow/FollowUnfollow";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../bll/store";
import { UserType } from "../../../api/users-api";
import { selectRequestProcessingStatus } from "../../../utils/selectors";

type PropsType = {
  user: UserType;
};

export const User: FC<PropsType> = ({ user }) => {
  const navigate = useNavigate();

  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const handleMoveToUserProfile = (userId: number) => {
    if (isRequestProcessing) {
      return;
    }
    navigate(`/profile/${userId}`);
  };

  return (
    <div className={styles.userArea}>
      <div className={styles.userData}>
        <img
          className={styles.userPhoto}
          src={
            user.photos.small
              ? user.photos.small
              : user.photos.large
              ? user.photos.large
              : defaultPhoto
          }
          alt="userPhoto"
          onClick={() => handleMoveToUserProfile(user.id)}
        />
        <div className={styles.userInfo}>
          <b>{user.name}</b>
          <span>Status: {user.status ? user.status : "-----"}</span>
        </div>
      </div>
      <FollowUnfollow followed={user.followed} userId={user.id} />
    </div>
  );
};
