import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { loginTC } from "../../bll/auth-reducer";
import { Button } from "../common/Button/Button";
import { setAppErrorAC } from "../../bll/app-reducer";
import {
  selectCaptchaUrl,
  selectLoginError,
  selectRequestProcessingStatus,
} from "../../utils/selectors";

type FormInputsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

const schema = yup
  .object({
    email: yup.string().required("Email is required").email("Must be a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password should be at least 3 characters")
      .max(20, "Password should be at most 20 characters"),
  })
  .required();

export const Login = () => {
  const dispatch = useAppDispatch();

  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const captchaUrl = useAppSelector(selectCaptchaUrl);
  const loginError = useAppSelector(selectLoginError);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputsType) => {
    dispatch(loginTC(data.email, data.password, data.rememberMe, data.captcha));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    return () => {
      dispatch(setAppErrorAC(null));
    };
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <h2>LogIn</h2>
        <div className={styles.explanation}>
          <span>
            To log in get registered
            <a
              className={styles.link}
              href={"https://social-network.samuraijs.com/"}
              target={"_blank"}
              rel={"noreferrer"}
            >
              here
            </a>
          </span>
          <span>or use common test account credentials:</span>
          <span>Email: free@samuraijs.com</span>
          <span>Password: free</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input placeholder="Email" disabled={isRequestProcessing} {...register("email")} />
            <p className={styles.error}>{errors.email?.message}</p>
          </div>
          <div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              disabled={isRequestProcessing}
              {...register("password")}
            />
            <span className={styles.eye} onClick={handlePasswordVisibility}>
              &#128065;
            </span>
            <p className={styles.error}>{errors.password?.message}</p>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={true}
              disabled={isRequestProcessing}
              {...register("rememberMe")}
            />
            <span>Remember me</span>
          </div>
          {loginError && <div className={styles.error}>{loginError}</div>}
          {captchaUrl && (
            <div className={styles.captchaBlock}>
              <img className={styles.captcha} src={captchaUrl} alt="anti-bot symbols" />
              <input
                placeholder="Anti-bot symbols"
                disabled={isRequestProcessing}
                {...register("captcha")}
              />
              <p className={styles.error}>{errors.captcha?.message}</p>
            </div>
          )}
          <Button title={"LogIn"} disabled={isRequestProcessing} />
        </form>
      </div>
    </div>
  );
};
