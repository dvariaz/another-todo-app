import DashboardCard from "@dashboard/components/DashboardCard";
import { useGetDashboardsQuery } from "@api/services/DashboardService";
import { Dashboard } from "@dashboard/types/Dashboard";

const HomePage = () => {
  const { data, error, isLoading } = useGetDashboardsQuery();

  return (
    <div>
      <h1>Home</h1>
      {isLoading ? (
        <span>Cargando</span>
      ) : (
        data && (
          <div className="grid grid-cols-3 gap-2">
            {data.map((dashboard: Dashboard) => (
              <DashboardCard
                key={dashboard._id}
                title={dashboard.title}
                description={dashboard.description}
                shared_users={dashboard.shared_users.length}
                url={"dashboard/" + dashboard._id}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default HomePage;
