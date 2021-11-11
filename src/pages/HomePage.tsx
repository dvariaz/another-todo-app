// Types
import { IDashboard } from "@dashboard/types/Dashboard";

// Components
import DashboardCard from "@dashboard/components/DashboardCard";
import ProfileDropdown from "@common/components/ProfileDropdown";

// Hooks
import { useGetDashboardsQuery } from "@api/services/DashboardService";

const HomePage = () => {
  const { data, error, isLoading } = useGetDashboardsQuery();

  return (
    <div className="page">
      <header className="flex items-center mb-5">
        <h1 className="page-title flex-1 ">Welcome User!</h1>
        <ProfileDropdown name="John Doe" />
      </header>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        data && (
          <div className="card-container p-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {data.map((dashboard: IDashboard) => (
              <DashboardCard
                key={dashboard._id}
                title={dashboard.title}
                description={dashboard.description}
                shared_users={dashboard.shared_users.length}
                background_photo={dashboard.background_photo}
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
