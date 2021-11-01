export interface IUser {
  _id: string;
  name: string;
  email: string;
  profile_photo: string;
  role: "USER_ROLE" | "ADMIN_ROLE";
  createdAt: string;
}
