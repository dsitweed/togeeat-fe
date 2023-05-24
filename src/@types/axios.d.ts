import axios, { AxiosResponse } from "axios";
import { IResponse } from "@/plugins/axios";

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<IResponse<T>> {}
}
