import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./ProfileStatus.module.css";
import { useAppDispatch, useAppSelector } from "../../../../bll/store";
import { getUserStatusTC, updateUserStatusTC } from "../../../../bll/profile-reducer";

type PropsType = { userId: number };

export const ProfileStatus: FC<PropsType> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const authedUserId = useAppSelector((state) => state.auth.id);
  const userStatus = useAppSelector((state) => state.profilePage.userStatus);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<string>(userStatus);

  const handleActivateEditMode = () => {
    setEditMode(true);
  };

  const handleUpdateStatus = () => {
    dispatch(updateUserStatusTC(status));
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
          <span>{userStatus || "-----"}</span>
          {authedUserId === userId && (
            <span className={styles.pencil} onClick={handleActivateEditMode}>
              &#128393;
            </span>
          )}
        </div>
      )}
      {isRequestProcessing && <span>Loading...</span>}
    </div>
  );
};
