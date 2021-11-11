import { useState } from "react";
import classNames from "classnames";

interface IDropdownMenuProps {
  icon: string;
  items: {
    icon?: string;
    label: string;
    callback: () => void;
  }[];
  iconClassName?: string;
}

const DropdownMenu = ({ icon, items, iconClassName }: IDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <i className={classNames(`isax isax-${icon}`, iconClassName)} />
      </div>
      {isOpen && (
        <ul className="bg-white absolute top-0 -right-40 min-w-sm p-2 rounded-lg shadow-md text-center">
          {items.map(({ icon, label, callback }) => (
            <li
              onClick={() => {
                callback();
                setIsOpen(false);
              }}
              className="p-2 border-b border-gray-100 cursor-pointer text-gray-700 hover:text-primary-200 last:border-b-0 flex items-center"
            >
              {icon && <i className={`isax isax-${icon} absolute left-4`} />}
              <span className="flex-1">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
