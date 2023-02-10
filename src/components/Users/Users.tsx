import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { followUserAC, setUsersAC, unfollowUserAC } from "../../bll/users-reducer";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.jpg";
import { api } from "../../api/api";

export const Users = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.usersPage.users);

  const handleUnfollowUser = (userId: number) => {
    dispatch(unfollowUserAC(userId));
  };

  const handleFollowUser = (userId: number) => {
    dispatch(followUserAC(userId));
  };

  useEffect(() => {
    api.getUsers().then((response) => dispatch(setUsersAC(response.data.items)));
  }, [dispatch]);

  return (
    <div className={styles.content}>
      {users.map((user) => (
        <div key={user.id} className={styles.userArea}>
          <div className={styles.userData}>
            <img
              src={
                user.photos.small
                  ? user.photos.small
                  : user.photos.large
                  ? user.photos.large
                  : userPhoto
              }
              alt="userPhoto"
              className={styles.userPhoto}
            />
            <div className={styles.userInfo}>
              <span>{user.name}</span>
              <span>{user.status}</span>
            </div>
          </div>
          {user.followed ? (
            <button className={styles.btn} onClick={() => handleUnfollowUser(user.id)}>
              Unollow
            </button>
          ) : (
            <button className={styles.btn} onClick={() => handleFollowUser(user.id)}>
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
