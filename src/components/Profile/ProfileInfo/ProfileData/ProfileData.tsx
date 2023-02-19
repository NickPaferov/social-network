import React, { FC } from "react";
import { useAppSelector } from "../../../../bll/store";
import styles from "./ProfileData.module.css";
import { UserContactsType } from "../../../../api/profile-api";
import { Button } from "../../../common/Button/Button";

type PropsType = {
  onEditMode: () => void;
};

export const ProfileData: FC<PropsType> = ({ onEditMode }) => {
  const currentUserProfile = useAppSelector((state) => state.profilePage.currentUserProfile);
  const currentUserId = useAppSelector((state) => state.profilePage.currentUserProfile?.userId);
  const authedUserId = useAppSelector((state) => state.auth.id);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const handleOnEditMode = () => {
    onEditMode();
  };

  return (
    <div>
      {isRequestProcessing && <div>Loading...</div>}
      {currentUserProfile && !isRequestProcessing && (
        <div>
          <div className={styles.name}>{currentUserProfile.fullName}</div>
          <div className={styles.lookingForAJob}>Looking for a job</div>
          <div>
            <span className={styles.title}>About me: </span>
            <span>{currentUserProfile.aboutMe}</span>
          </div>
          <div>
            <span className={styles.title}>My professional skills: </span>
            <span>{currentUserProfile.lookingForAJobDescription}</span>
          </div>
          <div>
            <span className={styles.title}>Contacts:</span>
            <div>
              {Object.keys(currentUserProfile.contacts).map((key) => {
                return (
                  <div key={key} className={styles.contacts}>
                    {currentUserProfile.contacts[key as keyof UserContactsType] && (
                      <div>
                        <span className={styles.title}>{key}: </span>
                        <a href={currentUserProfile.contacts[key as keyof UserContactsType]}>
                          {currentUserProfile.contacts[key as keyof UserContactsType]}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {currentUserId === authedUserId && (
        <Button title={"Edit"} disabled={isRequestProcessing} handleClick={handleOnEditMode} />
      )}
    </div>
  );
};
