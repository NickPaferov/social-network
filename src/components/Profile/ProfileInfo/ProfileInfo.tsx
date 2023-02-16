import React, { ChangeEvent, useState } from "react";
import styles from "./ProfileInfo.module.css";
import defaultPhoto from "../../../assets/images/defaultPhoto.jpg";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import { updateAuthedUserPhotoTC } from "../../../bll/profile-reducer";
import { ProfileData } from "./ProfileData/ProfileData";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";

export const ProfileInfo = () => {
  const dispatch = useAppDispatch();

  const currentUserProfile = useAppSelector((state) => state.profilePage.currentUserProfile);
  const authedUserProfile = useAppSelector((state) => state.profilePage.authedUserProfile);
  const currentUserId = useAppSelector((state) => state.profilePage.currentUserProfile?.userId);
  const authedUserId = useAppSelector((state) => state.auth.id);

  const [editMode, setEditMode] = useState(false);

  const handleUpdatePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      dispatch(updateAuthedUserPhotoTC(e.currentTarget.files[0]));
    }
  };

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
  };

  return (
    <div>
      {currentUserProfile && (
        <div className={styles.profileBlock}>
          <div className={styles.profileInfo}>
            <div className={styles.avaBlock}>
              {authedUserId === currentUserId ? (
                <img
                  className={styles.ava}
                  src={
                    authedUserProfile?.photos.large
                      ? authedUserProfile?.photos.large
                      : authedUserProfile?.photos.small
                      ? authedUserProfile?.photos.small
                      : defaultPhoto
                  }
                  alt="avatar"
                />
              ) : (
                <img
                  className={styles.ava}
                  src={
                    currentUserProfile.photos.large
                      ? currentUserProfile.photos.large
                      : currentUserProfile.photos.small
                      ? currentUserProfile.photos.small
                      : defaultPhoto
                  }
                  alt="avatar"
                />
              )}
              {authedUserId === currentUserId && (
                <div className={styles.camera}>
                  <input type="file" id="file" hidden onChange={handleUpdatePhoto} />
                  <label htmlFor="file">&#128247;</label>
                </div>
              )}
            </div>
            <ProfileStatus userId={currentUserProfile.userId} />
          </div>
          {editMode ? (
            <ProfileDataForm offEditMode={offEditMode} />
          ) : (
            <ProfileData onEditMode={onEditMode} />
          )}
        </div>
      )}
    </div>
  );
};
