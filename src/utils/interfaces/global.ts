export interface IUser {
  name: string;
  email: string;
  picture: string;
}
export interface IGlobal {
  user: IUser | boolean;
  accessToken: string | boolean;
  openAIAPI: string | boolean;
  logOut: () => void;
}