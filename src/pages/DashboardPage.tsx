// Types
import { RouteComponentProps } from "react-router";

// API
import { useGetDashboardQuery } from "@api/services/DashboardService";

type TDashboardParams = {
  id: string;
};

const DashboardPage = ({ match }: RouteComponentProps<TDashboardParams>) => {
  const { data, error, isLoading } = useGetDashboardQuery(match.params.id);

  return (
    <div className="page">
      {isLoading ? <span>Cargando</span> : data && <h1>{data.title}</h1>}
    </div>
  );
};

export default DashboardPage;
