declare namespace Response {
  interface IPaginationResult<T> {
    items: T[];
    count: number;
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
}

declare namespace I18nType {
  type Language = "en-US" | "vi-VN" | "ja-JP";
}
