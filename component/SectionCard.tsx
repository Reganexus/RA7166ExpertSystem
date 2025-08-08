type Props = {
  title: string;
  description: string;
  offenses?: string[];
  onClick: () => void;
};

export default function SectionCard({ title, description, offenses = [], onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
    >
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>

      {offenses.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500">
          {offenses.map((offense, index) => (
            <li key={index}>{offense}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
