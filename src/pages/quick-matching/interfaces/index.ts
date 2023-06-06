import { IUserInfo } from "@/pages/user/interfaces";

export interface IQuickMatching {
  address: string;
  conversationTopics: string;
  createdAt: Date;
  desiredFood: string;
  id: number;
  matchingDate: Date;
  matchingType: string;
  ownerId: number;
  owner: IUserInfo;
  status: string;
  updatedAt: Date;
}
