import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "804c672f-f395-46b8-8910-e4f6db1d6b62",
  },
});

export const api = {
  getUsers(page: number, count: number) {
    return instance.get<UsersResponseType>(`users?page=${page}&count=${count}`);
  },
  getUserProfile(userId: number) {
    return instance.get<UserProfileResponseType>(`profile/${userId}`);
  },
  authMe() {
    return instance.get<AuthMeResponseType>("auth/me");
  },
  follow(userId: number) {
    return instance.post<FollowUnfollowResponseType>(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`);
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

export type AuthMeResponseType = {
  data: AuthUserDataType;
  messages: any[];
  fieldsErrors: any[];
  resultCode: number;
};

export type AuthUserDataType = {
  id: number;
  login: string;
  email: string;
};

export type FollowUnfollowResponseType = {
  data: FollowUnfollowDataType;
  messages: any[];
  fieldsErrors: any[];
  resultCode: number;
};

type FollowUnfollowDataType = {};
