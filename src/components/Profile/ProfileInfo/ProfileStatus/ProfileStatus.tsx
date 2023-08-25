import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./ProfileStatus.module.css";
import { useAppDispatch, useAppSelector } from "../../../../bll/store";
import {
  getUserStatusTC,
  updateAuthedUserStatusTC,
} from "../../../../bll/profile-reducer";
import {
  selectAuthedUserId,
  selectCurrentUserId,
  selectRequestProcessingStatus,
  selectStatusError,
  selectUserStatus,
} from "../../../../utils/selectors";

type PropsType = { userId: number };

export const ProfileStatus: FC<PropsType> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const authedUserId = useAppSelector(selectAuthedUserId);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const userStatus = useAppSelector(selectUserStatus);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const statusError = useAppSelector(selectStatusError);

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<string>(userStatus);

  const handleActivateEditMode = () => {
    setEditMode(true);
  };

  const handleUpdateStatus = () => {
    dispatch(updateAuthedUserStatusTC(status));
    setEditMode(false);
  };

  const handleChangeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(getUserStatusTC(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setStatus(userStatus);
  }, [userStatus]);

  return (
    <div>
      {editMode && (
        <div className={styles.status}>
          <input autoFocus value={status} onChange={handleChangeStatusText} />
          <button onClick={handleUpdateStatus}>Save</button>
        </div>
      )}
      {!editMode && !isRequestProcessing && (
        <div className={styles.status}>
          <div>
            <span className={styles.title}>Status: </span>
            <b>{userStatus || "-----"}</b>
          </div>
          {authedUserId === userId && (
            <span className={styles.pencil} onClick={handleActivateEditMode}>
              &#128393;
            </span>
          )}
        </div>
      )}
      {isRequestProcessing && <span>Loading...</span>}
      {authedUserId === currentUserId && statusError && (
        <div className={styles.error}>{statusError}</div>
      )}
    </div>
  );
};
