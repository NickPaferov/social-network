import { instance } from "./api-instance";

export const usersAPI = {
  getUsers(page: number, count: number) {
    return instance.get<UsersResponseType>(`users?page=${page}&count=${count}`);
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
