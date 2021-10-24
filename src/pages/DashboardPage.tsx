// Types
import { RouteComponentProps } from "react-router";

// API
import { useGetDashboardQuery } from "@api/services/DashboardService";

//Components
import TaskGroup from "@task/components/TaskGroup";
import TaskCard from "@task/components/TaskCard";

type TDashboardParams = {
  id: string;
};

const DashboardPage = ({ match }: RouteComponentProps<TDashboardParams>) => {
  const { data, error, isLoading } = useGetDashboardQuery(match.params.id);

  return (
    <div>
      {isLoading ? (
        <span>Cargando</span>
      ) : (
        data && (
          <>
            <header className="p-10 mb-5">
              <h1 className="page-title">{data.title}</h1>
            </header>
            <div className="w-full overflow-x-scroll">
              <div className="inline-flex">
                {data.task_groups &&
                  data.task_groups.map((task_group) => (
                    <TaskGroup name={task_group.name}>
                      {task_group.tasks.map((task) => (
                        <TaskCard
                          title={task.title}
                          description={task.description}
                          shared_users={task.shared_users}
                          created_by={task.created_by}
                          className="mb-4"
                        />
                      ))}
                    </TaskGroup>
                  ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DashboardPage;
