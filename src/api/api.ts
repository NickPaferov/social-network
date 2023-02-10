import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const api = {
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
  photos: PhotosType;
  status: string;
  followed: boolean;
};

type PhotosType = {
  small: string;
  large: string;
};
