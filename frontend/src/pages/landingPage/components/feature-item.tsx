
export type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};
export default function Feature({ icon, title, description } : FeatureProps) {
  return (
    <div className="flex items-start gap-4 ">
      <div className="flex items-center justify-center bg-orange-600 rounded w-16 h-16">
        <img
          src={icon}
          className="w-10 h-10 object-contain filter brightness-0 invert"
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 max-w-[400px]">
        <p className="text-xl font-semibold text-gray-900">{title}</p>
        <p className="text-base text-gray-500 text-start">{description}</p>
      </div>
    </div>
  );
}

