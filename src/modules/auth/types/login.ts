import { IUser } from "@common/types/User";

export interface IUserCredentials extends Pick<IUser, "email"> {
    password: string;
}
