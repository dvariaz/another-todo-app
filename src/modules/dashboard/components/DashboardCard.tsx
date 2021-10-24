import { Link } from "react-router-dom";

// Utils
import pluralize from "pluralize";

interface IDashboardCard {
  key: string | undefined | null;
  url: string;
  title: string;
  description: string;
  shared_users: number;
  background_photo?: string;
}

const DashboardCard = ({
  title,
  description,
  shared_users,
  background_photo,
  url,
}: IDashboardCard) => {
  return (
    <div>
      <div>
        <h3>{title}</h3>
      </div>
      <div className="flex">
        <div>
          Shared with {shared_users} {pluralize("user", shared_users)}
        </div>
        <div>{description}</div>
      </div>
      <div>
        <Link to={url}>Open</Link>
      </div>
    </div>
  );
};

export default DashboardCard;
