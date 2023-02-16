import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../bll/store";
import { updateAuthedUserProfileTC } from "../../../../bll/profile-reducer";
import styles from "./ProfileDataForm.module.css";

type FormInputsType = {
  fullName: string;
  lookingForAJob: boolean;
  aboutMe: string;
  lookingForAJobDescription: string;
  contacts: ContactsType;
};

type ContactsType = {
  [facebook: string]: string;
  website: string;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: string;
  github: string;
  mainLink: string;
};

type PropsType = {
  offEditMode: () => void;
};

export const ProfileDataForm: FC<PropsType> = ({ offEditMode }) => {
  const dispatch = useAppDispatch();

  const currentUserProfile = useAppSelector((state) => state.profilePage.currentUserProfile);
  const { register, handleSubmit } = useForm<FormInputsType>();
  const onSubmit = (data: FormInputsType) => {
    dispatch(updateAuthedUserProfileTC(data));
    offEditMode();
  };

  return (
    <div>
      {currentUserProfile && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className={styles.title}>Name: </span>
            <input
              type="text"
              placeholder={"Name"}
              defaultValue={currentUserProfile.fullName}
              {...register("fullName")}
            />
          </div>
          <div>
            <span className={styles.title}>Looking for a job: </span>
            <input
              type="checkbox"
              defaultChecked={currentUserProfile.lookingForAJob}
              {...register("lookingForAJob")}
            />
          </div>
          <div>
            <span className={styles.title}>About me: </span>
            <textarea
              placeholder={"About me"}
              defaultValue={currentUserProfile.aboutMe}
              {...register("aboutMe")}
            />
          </div>
          <div>
            <span className={styles.title}>My professional skills: </span>
            <textarea
              placeholder={"My professional skills"}
              defaultValue={currentUserProfile.lookingForAJobDescription}
              {...register("lookingForAJobDescription")}
            />
          </div>
          <div>
            <span className={styles.title}>Contacts:</span>
            <div>
              {Object.keys(currentUserProfile.contacts).map((key) => {
                return (
                  <div key={key} className={styles.contacts}>
                    <span className={styles.title}>{key}: </span>
                    <input
                      type="text"
                      placeholder={key}
                      defaultValue={currentUserProfile.contacts[key]}
                      {...register(`contacts.${key}`)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button>Save</button>
        </form>
      )}
    </div>
  );
};
