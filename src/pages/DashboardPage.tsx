import pluralize from "pluralize";

// Types
import { RouteComponentProps } from "react-router";
import { TDashboardParams } from "src/App";

// API
import { useGetDashboardQuery } from "@api/services/DashboardService";

//Components
import TaskGroup from "@task/components/TaskGroup";
import Feature from "@common/components/Feature";
import ProfileDropdown from "@common/components/ProfileDropdown";

const DashboardPage = ({ match }: RouteComponentProps<TDashboardParams>) => {
  const { data, isLoading } = useGetDashboardQuery(match.params.id);

  return (
    <div>
      {isLoading ? (
        <span>Cargando</span>
      ) : (
        data && (
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
                <div className="flex">
                  {data.shared_users.map((user) => (
                    <img
                      key={user._id}
                      src={user.profile_photo}
                      alt={`${user.name} photo`}
                      className="circle-photo ml-2"
                    />
                  ))}
                </div>
              </div>
            </header>
            <div className="w-full overflow-x-scroll">
              <div className="inline-flex">
                {data.task_groups &&
                  data.task_groups.map((task_group) => (
                    <div
                      key={task_group._id}
                      className="mx-2 first:ml-8 last:mr-8"
                    >
                      <TaskGroup
                        id={task_group._id}
                        name={task_group.name}
                        initialTasks={task_group.tasks}
                      />
                    </div>
                  ))}
                <div className="first:ml-8 last:mr-8">
                  <div className="task-group items-center">
                    <button className="btn w-full">Add Group</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DashboardPage;
