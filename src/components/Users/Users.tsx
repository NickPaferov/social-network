import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { getUsersTC, setCurrentPageAC, setUsersCountPerPageAC } from "../../bll/users-reducer";
import styles from "./Users.module.css";
import defaultPhoto from "../../assets/images/defaultPhoto.jpg";
import { PaginationBlock } from "../common/PaginationBlock/PaginationBlock";
import { useNavigate } from "react-router-dom";
import { FollowUnfollow } from "../common/FollowUnfollow/FollowUnfollow";

export const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector((state) => state.usersPage.users);
  const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount);
  const currentPage = useAppSelector((state) => state.usersPage.currentPage);
  const usersCountPerPage = useAppSelector((state) => state.usersPage.usersCountPerPage);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPageAC(page));
  };

  const onChangeUsersCountPerPage = (usersCountPerPage: number) => {
    dispatch(setUsersCountPerPageAC(usersCountPerPage));
  };

  useEffect(() => {
    dispatch(getUsersTC(currentPage, usersCountPerPage));
  }, [dispatch, totalUsersCount, currentPage, usersCountPerPage]);

  const handleMoveToUserProfile = (userId: number) => {
    if (isRequestProcessing) {
      return;
    }
    navigate(`/profile/${userId}`);
  };

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
              <span>{user.name}</span>
              <span>{user.status}</span>
            </div>
          </div>
          <FollowUnfollow followed={user.followed} userId={user.id} />
        </div>
      ))}
    </div>
  );
};
