import React, { FC } from "react";
import { UserContactsType } from "../../../../../api/profile-api";
import { DeepRequired, FieldErrorsImpl, GlobalError } from "react-hook-form";
import { FormInputsType } from "../ProfileDataForm";
import styles from "./ProfileDataFormError.module.css";

type PropsType = {
  contact: string;
  errors: Partial<FieldErrorsImpl<DeepRequired<FormInputsType>>> & {
    root?: Record<string, GlobalError> & GlobalError;
  };
};

export const ProfileDataFormError: FC<PropsType> = ({ contact, errors }) => {
  return (
    <div>
      {errors.contacts &&
        Object.keys(errors.contacts).map((errorContact) => {
          return (
            <p key={errorContact} className={styles.error}>
              {errors.contacts &&
                contact === errorContact &&
                errors.contacts[contact as keyof UserContactsType]?.message}
            </p>
          );
        })}
    </div>
  );
};
