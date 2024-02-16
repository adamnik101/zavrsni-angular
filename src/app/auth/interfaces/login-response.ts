import {User} from "../../user/interfaces/user";

export interface LoginResponse {
  token: string
  user: User
}
