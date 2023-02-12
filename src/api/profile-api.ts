import { instance } from "./api-instance";

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get<UserProfileResponseType>(`profile/${userId}`);
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
