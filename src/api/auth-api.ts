import { instance } from "./api-instance";

export const authAPI = {
  authMe() {
    return instance.get<AuthMeResponseType>("auth/me");
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
  ) {
    return instance.post<LoginResponseType>("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete<AuthMeResponseType>("auth/login");
  },
};

export type AuthMeResponseType = {
  data: AuthUserDataType;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};

export type AuthUserDataType = {
  id: number;
  login: string;
  email: string;
};

export type LoginResponseType = {
  data: LoginDataType;
  messages: string[];
  resultCode: number;
};

export type LoginDataType = {
  userId: number;
};

export type LogoutResponseType = {
  data: LogoutDataType;
  messages: string[];
  resultCode: number;
};
export type LogoutDataType = {};
