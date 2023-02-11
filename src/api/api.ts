import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const api = {
  getUsers(page: number, count: number) {
    return instance.get<UsersResponseType>(`users?page=${page}&count=${count}`);
  },
  getUserProfile(userId: number) {
    return instance.get<UserProfileResponseType>(`profile/${userId}`);
  },
};

type UsersResponseType = {
  items: UserType[];
  totalCount: number;
  error: string;
};

export type UserType = {
  id: number;
  name: string;
  photos: UserPhotosType;
  status: string;
  followed: boolean;
};

type UserPhotosType = {
  small: string;
  large: string;
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
  website?: any;
  vk: string;
  twitter: string;
  instagram: string;
  youtube?: any;
  github: string;
  mainLink?: any;
};
