export interface User {
  _id: String;
  name: String;
  email: String;
  profile_photo: String;
  role: "USER_ROLE" | "ADMIN_ROLE";
  createdAt: Date;
  updatedAt: Date;
}
