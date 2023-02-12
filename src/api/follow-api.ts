import { instance } from "./api-instance";

export const followAPI = {
  follow(userId: number) {
    return instance.post<FollowUnfollowResponseType>(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`);
  },
};

type FollowUnfollowResponseType = {
  data: FollowUnfollowDataType;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};

type FollowUnfollowDataType = {};
