declare namespace Response {
  interface IPaginationResult<T> {
    items: T[];
    count: number;
  }

  interface IShortUser {
    id: number;
    name: string;
    avatar: string;
  }

  interface IUser {
    id: number;
    name: string;
    age: number;
    description: string;
    avatar: string;
    phone: string;
    address: string;
    nationality: string;
    languageSkills: string;
    isPublic: boolean;
  }

  export interface IQuickMatching {
    address: string;
    conversationTopics: string;
    createdAt: Date;
    desiredFood: string;
    id: number;
    matchingDate: Date;
    matchingType: string;
    ownerId: number;
    owner: IShortUser;
    status: string;
    updatedAt: Date;
    lat: number;
    long: number;
    userMatchings: {
      userId: number;
      user: IShortUser;
    }[];
  }

  export interface IScheduleMatching extends IQuickMatching {}

  export interface IMatchingHistory {
    userId: number;
    matchingId: number;
    matching: IScheduleMatching;
  }
}

declare namespace I18nType {
  type Language = "en" | "vi" | "ja";
}
