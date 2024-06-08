import { MouseEventHandler } from "react";

export interface ILogin {
  saveOpenAPIKey: (key: string) => void;
  handleLogin: MouseEventHandler<HTMLButtonElement> | undefined;
  loading: boolean;
}
