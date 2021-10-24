import classNames from "classnames";

interface IFeatureProps {
  icon: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const Feature = ({ icon, title, subtitle, className }: IFeatureProps) => {
  return (
    <div className={classNames("flex p-2 pl-0", className)}>
      <i className={`isax isax-${icon} text-3xl text-gray-300 my-auto mr-2`} />
      <div className="text-sm">
        <span className="text-gray font-semibold">{title}</span>
        <p className="text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
};

export default Feature;
