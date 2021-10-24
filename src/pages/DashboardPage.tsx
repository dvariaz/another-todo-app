// Types
import { RouteComponentProps } from "react-router";
import { Dashboard } from "@dashboard/types/Dashboard";

// API
import { useGetDashboardQuery } from "@api/services/DashboardService";

type TParams = {
  id: string;
};

const DashboardPage = ({ match }: RouteComponentProps<TParams>) => {
  const { data, error, isLoading } = useGetDashboardQuery(match.params.id);

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <span>Cargando</span>
      ) : (
        data && (
          <div className="grid grid-cols-3 gap-2">
            <h1>{data.title}</h1>
          </div>
        )
      )}
    </div>
  );
};

export default DashboardPage;
