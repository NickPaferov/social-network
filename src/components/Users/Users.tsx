import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { followUserAC, setUsersAC, unfollowUserAC } from "../../bll/users-reducer";
import styles from "./Users.module.css";

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
    dispatch(
      setUsersAC([
        { id: 1, photo: "userPhoto", followed: true, fullName: "Alexey B." },
        { id: 2, photo: "userPhoto", followed: false, fullName: "Andrew K. " },
        { id: 3, photo: "userPhoto", followed: false, fullName: "Artem T." },
        { id: 4, photo: "userPhoto", followed: true, fullName: "Denis K." },
        { id: 5, photo: "userPhoto", followed: true, fullName: "Dmitry Z." },
        { id: 6, photo: "userPhoto", followed: true, fullName: "Ilya L." },
        { id: 7, photo: "userPhoto", followed: false, fullName: "Nikita D." },
        { id: 8, photo: "userPhoto", followed: true, fullName: "Sergey T." },
      ])
    );
  }, [dispatch]);

  return (
    <div className={styles.content}>
      {users.map((user) => (
        <div key={user.id} className={styles.userArea}>
          <div>
            <img src={user.photo} alt="userPhoto" className={styles.userPhoto} />
            <span>{user.fullName}</span>
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
