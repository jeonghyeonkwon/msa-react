export interface IAuth {
  username: string;
  password: string;
}

export interface IRegister extends IAuth {
  nickName: string;
}
