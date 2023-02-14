import { instance } from "./api-instance";

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get<UserProfileResponseType>(`profile/${userId}`);
  },
  getUserStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  updateUserStatus(status: string) {
    return instance.put<UpdateStatusResponseType>("profile/status", { status });
  },
};

export type UserProfileResponseType = {
  aboutMe: string;
  contacts: UserContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: UserPhotosType;
};

type UserContactsType = {
  facebook: string;
  website?: string;
  vk: string;
  twitter: string;
  instagram: string;
  youtube?: string;
  github: string;
  mainLink?: string;
};

type UserPhotosType = {
  small: string;
  large: string;
};

export type UpdateStatusResponseType = {
  resultCode: number;
  messages: string[];
  data: {};
};
