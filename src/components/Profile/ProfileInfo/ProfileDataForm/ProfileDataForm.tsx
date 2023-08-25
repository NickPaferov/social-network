import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../bll/store";
import { updateAuthedUserProfileTC } from "../../../../bll/profile-reducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ProfileDataForm.module.css";
import { UserContactsType } from "../../../../api/profile-api";
import { ProfileDataFormError } from "./ProfileDataFormErrors/ProfileDataFormError";
import { Button } from "../../../common/Button/Button";
import {
  selectCurrentUserProfile,
  selectRequestProcessingStatus,
} from "../../../../utils/selectors";

export type FormInputsType = {
  fullName: string;
  lookingForAJob: boolean;
  aboutMe: string;
  lookingForAJobDescription: string;
  contacts: UserContactsType;
};

const schema = yup
  .object()
  .shape({
    fullName: yup.string().trim().required("Field is required"),
    aboutMe: yup.string().trim().required("Field is required"),
    lookingForAJobDescription: yup
      .string()
      .trim()
      .required("Field is required"),
    contacts: yup.object().shape({
      facebook: yup.string().url("Must be a valid url"),
      website: yup.string().url("Must be a valid url"),
      vk: yup.string().url("Must be a valid url"),
      twitter: yup.string().url("Must be a valid url"),
      instagram: yup.string().url("Must be a valid url"),
      youtube: yup.string().url("Must be a valid url"),
      github: yup.string().url("Must be a valid url"),
      mainLink: yup.string().url("Must be a valid url"),
    }),
  })
  .required();

type PropsType = {
  offEditMode: () => void;
};

export const ProfileDataForm: FC<PropsType> = ({ offEditMode }) => {
  const dispatch = useAppDispatch();

  const currentUserProfile = useAppSelector(selectCurrentUserProfile);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

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
            <p className={styles.error}>{errors.fullName?.message}</p>
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
            <p className={styles.error}>{errors.aboutMe?.message}</p>
          </div>
          <div>
            <span className={styles.title}>My professional skills: </span>
            <textarea
              placeholder={"My professional skills"}
              defaultValue={currentUserProfile.lookingForAJobDescription}
              {...register("lookingForAJobDescription")}
            />
            <p className={styles.error}>
              {errors.lookingForAJobDescription?.message}
            </p>
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
                      defaultValue={
                        currentUserProfile.contacts[
                          key as keyof UserContactsType
                        ]
                      }
                      {...register(`contacts.${key as keyof UserContactsType}`)}
                    />
                    <ProfileDataFormError contact={key} errors={errors} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.btnBlock}>
            <Button
              title={"Cancel"}
              disabled={isRequestProcessing}
              handleClick={offEditMode}
            />
            <Button title={"Save"} disabled={isRequestProcessing} />
          </div>
        </form>
      )}
    </div>
  );
};
