import { instance } from "./api-instance";

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<GetCaptchaUrlResponseType>("security/get-captcha-url");
  },
};

export type GetCaptchaUrlResponseType = {
  url: string;
};
