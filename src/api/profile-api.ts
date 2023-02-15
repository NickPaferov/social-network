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
  updateUserPhoto(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put<UpdatePhotoResponseType>("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export type UserPhotosType = {
  small: string | null;
  large: string | null;
};

export type UpdateStatusResponseType = {
  resultCode: number;
  messages: string[];
  data: UpdateStatusDataType;
};

type UpdateStatusDataType = {};

type UpdatePhotoResponseType = {
  resultCode: number;
  messages: string[];
  data: {
    photos: UserPhotosType;
  };
};
