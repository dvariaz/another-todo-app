import classNames from "classnames";

interface IProfileDropdownProps {
  name: string;
  className?: string;
}

const ProfileDropdown = ({ name, className }: IProfileDropdownProps) => {
  return (
    <div className={classNames("flex items-center", className)}>
      <div className="mr-2">
        <i className="isax isax-profile-circle text-2xl text-gray-300" />
      </div>
      <span className="text-gray font-medium">{name}</span>
    </div>
  );
};

export default ProfileDropdown;
