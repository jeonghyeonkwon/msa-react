import { IAuth, IRegister } from "@/interfaces/Auth";
import { LOGIN_URL, useApi } from "./client";
import { RequestMethod, MsaService } from "./Request";

const BASE_ENDPOINT = (path: string) => `/api/auth${path}`;

export const register = async (dto: IRegister): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(
    BASE_ENDPOINT("/user"),
    RequestMethod.POST,
    MsaService.AUTH,
    dto
  );
};

export const login = async (dto: IAuth): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(LOGIN_URL, RequestMethod.POST, MsaService.AUTH, dto);
};

export const certification = async (): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(BASE_ENDPOINT(""), RequestMethod.GET, MsaService.AUTH);
};

export const logout = async (): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(
    BASE_ENDPOINT("/logout"),
    RequestMethod.GET,
    MsaService.AUTH
  );
};
