import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  followUserAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  setUsersCountPerPageAC,
  unfollowUserAC,
} from "../../bll/users-reducer";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.jpg";
import { api } from "../../api/api";
import { PaginationBlock } from "../common/PaginationBlock/PaginationBlock";
import { setIsRequestProcessingStatusAC } from "../../bll/app-reducer";

export const Users = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.usersPage.users);
  const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount);
  const currentPage = useAppSelector((state) => state.usersPage.currentPage);
  const usersCountPerPage = useAppSelector((state) => state.usersPage.usersCountPerPage);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const handleUnfollowUser = (userId: number) => {
    dispatch(unfollowUserAC(userId));
  };

  const handleFollowUser = (userId: number) => {
    dispatch(followUserAC(userId));
  };

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPageAC(page));
  };

  const onChangeUsersCountPerPage = (usersCountPerPage: number) => {
    dispatch(setUsersCountPerPageAC(usersCountPerPage));
  };

  useEffect(() => {
    dispatch(setIsRequestProcessingStatusAC(true));
    api.getUsers(currentPage, usersCountPerPage).then((response) => {
      dispatch(setUsersAC(response.data.items));
      dispatch(setTotalUsersCountAC(response.data.totalCount));
      dispatch(setIsRequestProcessingStatusAC(false));
    });
  }, [dispatch, totalUsersCount, currentPage, usersCountPerPage]);

  return (
    <div className={styles.content}>
      <PaginationBlock
        totalItemsCount={totalUsersCount}
        pagesRangeSize={10}
        currentPage={currentPage}
        itemsCountPerPage={usersCountPerPage}
        itemsName={"users"}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangeItemsCountPerPage={onChangeUsersCountPerPage}
      />
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
            <button
              className={styles.btn}
              disabled={isRequestProcessing}
              onClick={() => handleUnfollowUser(user.id)}
            >
              Unollow
            </button>
          ) : (
            <button
              className={styles.btn}
              disabled={isRequestProcessing}
              onClick={() => handleFollowUser(user.id)}
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
