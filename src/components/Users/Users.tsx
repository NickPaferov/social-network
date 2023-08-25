import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  getUsersTC,
  setCurrentPageAC,
  setUsersCountPerPageAC,
} from "../../bll/users-reducer";
import styles from "./Users.module.css";
import { PaginationBlock } from "../common/PaginationBlock/PaginationBlock";
import { User } from "./User/User";
import { setAppErrorAC } from "../../bll/app-reducer";
import {
  selectCurrentPage,
  selectTotalUsersCount,
  selectUsers,
  selectUsersCountPerPage,
} from "../../utils/selectors";

export const Users = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const totalUsersCount = useAppSelector(selectTotalUsersCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const usersCountPerPage = useAppSelector(selectUsersCountPerPage);

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPageAC(page));
  };

  const onChangeUsersCountPerPage = (usersCountPerPage: number) => {
    dispatch(setUsersCountPerPageAC(usersCountPerPage));
  };

  useEffect(() => {
    dispatch(getUsersTC(currentPage, usersCountPerPage));
    return () => {
      dispatch(setAppErrorAC(null));
    };
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
