import { IAuth, IRegister } from "@/interfaces/Auth";
import { useApi } from "./client";
import { RequestMethod } from "./Request";

const BASE_ENDPOINT = (path: string) => `/api/auth${path}`;

export const register = async (dto: IRegister): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(BASE_ENDPOINT("/user"), RequestMethod.POST, dto);
};

export const login = async (dto: IAuth): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData("/login", RequestMethod.POST, dto);
};
