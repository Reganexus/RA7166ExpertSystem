type Props = {
  section: {
    title: string;
    description: string;
    offenses?: string[];
  };
};

export default function SectionInfo({ section }: Props) {
  return (
    <>
      <h2 className="md:text-7xl text-3xl font-bold">{section.title}</h2>
      <p className="mb-4 md:text-4xl text-xl font-semibold text-white/75">{section.description}</p>

      {section.offenses && section.offenses.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          {section.offenses.map((offense, index) => (
            <div
              className="px-4 py-2 rounded-full w-max border-2 border-[var(--base-2)] text-white/75 md:text-xl text-sm"
              key={index}
            >
              {offense}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
