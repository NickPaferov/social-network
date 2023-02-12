import { instance } from "./api-instance";

export const authAPI = {
  authMe() {
    return instance.get<AuthMeResponseType>("auth/me");
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
