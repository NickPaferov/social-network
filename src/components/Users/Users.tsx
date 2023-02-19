import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { getUsersTC, setCurrentPageAC, setUsersCountPerPageAC } from "../../bll/users-reducer";
import styles from "./Users.module.css";
import { PaginationBlock } from "../common/PaginationBlock/PaginationBlock";
import { User } from "./User/User";

export const Users = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.usersPage.users);
  const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount);
  const currentPage = useAppSelector((state) => state.usersPage.currentPage);
  const usersCountPerPage = useAppSelector((state) => state.usersPage.usersCountPerPage);

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPageAC(page));
  };

  const onChangeUsersCountPerPage = (usersCountPerPage: number) => {
    dispatch(setUsersCountPerPageAC(usersCountPerPage));
  };

  useEffect(() => {
    dispatch(getUsersTC(currentPage, usersCountPerPage));
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
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};
