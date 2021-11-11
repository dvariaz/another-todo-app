// Components
import UsersList from "@common/components/UsersList";

// Hooks
import { useGetUsersByIdsQuery } from "@api/services/DashboardService";

interface ISharedUsersContainerProps {
  shared_users: string[];
}

const SharedUsersContainer = ({ shared_users }: ISharedUsersContainerProps) => {
  const { data, isLoading, error } = useGetUsersByIdsQuery(shared_users);

  if (data === undefined) return null;

  return <UsersList users={data} />;
};

export default SharedUsersContainer;
