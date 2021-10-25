import { Link } from "react-router-dom";

import "@dashboard/styles/DashboardCard.css";

// Components
import Feature from "@common/components/Feature";

// Utils
import pluralize from "pluralize";

interface IDashboardCardProps {
  key: string | undefined | null;
  url: string;
  title: string;
  description: string;
  shared_users: number;
  background_photo?: string;
  className?: string;
}

const DashboardCard = ({
  title,
  description,
  shared_users,
  background_photo,
  url,
  className,
}: IDashboardCardProps) => {
  return (
    <div className="card pt-5 px-5 pb-2 flex flex-col relative overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="flex flex-1 text-sm mb-2">
        <div>{description}</div>
      </div>
      <div className="flex">
        <Feature
          icon="profile-2user"
          title="Shared with"
          subtitle={`${shared_users} ${pluralize("user", shared_users)}`}
          className="flex-1"
        />
        <div className="flex">
          <Link to={url} className="btn-primary my-auto">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
