// Types
import { IUser } from "@common/types/User";

interface IUsersListProps {
  users: IUser[];
}

const UsersList = ({ users }: IUsersListProps) => {
  return (
    <div className="flex">
      {users.map((user) => (
        <img
          key={user._id}
          src={user.profile_photo}
          alt={`${user.name} photo`}
          className="circle-photo ml-2"
        />
      ))}
    </div>
  );
};

export default UsersList;
