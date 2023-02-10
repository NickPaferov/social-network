import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const api = {
  getUsers() {
    return instance.get<UsersResponseType>("users");
  },
};

type UsersResponseType = {
  items: UserType[];
  totalCount: number;
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
