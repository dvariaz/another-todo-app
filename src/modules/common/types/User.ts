export interface User {
  _id: string;
  name: string;
  email: string;
  profile_photo: string;
  role: "USER_ROLE" | "ADMIN_ROLE";
  createdAt: Date;
  updatedAt: Date;
}
