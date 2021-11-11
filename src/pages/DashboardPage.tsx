import pluralize from "pluralize";

// Types
import { RouteComponentProps } from "react-router";
import { TDashboardParams } from "src/App";

//Components
import Feature from "@common/components/Feature";
import ProfileDropdown from "@common/components/ProfileDropdown";
import SharedUsersContainer from "@dashboard/containers/SharedUsersContainer";
import DashboardTasksContainer from "@dashboard/containers/DashboardTasksContainer";

// Hooks
import { useGetDashboardByIdQuery } from "@api/services/DashboardService";

const DashboardPage = ({ match }: RouteComponentProps<TDashboardParams>) => {
  const { data, isLoading, error } = useGetDashboardByIdQuery(match.params.id);

  if (error) return <div>{error}</div>;

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Dashboard not found</div>;

  return (
    <>
      <header className="page">
        <div className="flex">
          <h1 className="page-title mb-4 flex-1">{data.title}</h1>
          <ProfileDropdown name="John Doe" />
        </div>
        <div className="flex items-center">
          <Feature
            icon="profile-2user"
            title="Shared with"
            subtitle={`${data.shared_users.length} ${pluralize(
              "user",
              data.shared_users.length
            )}`}
          />
          <SharedUsersContainer shared_users={data.shared_users} />
        </div>
      </header>
      <div className="w-full overflow-x-scroll">
        <DashboardTasksContainer initialTaskGroups={data.task_groups} />
      </div>
    </>
  );
};

export default DashboardPage;
