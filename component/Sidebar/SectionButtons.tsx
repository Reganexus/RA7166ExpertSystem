type Props = {
  collapsed: boolean;
  activeSection: string | null;
  setActiveSection: (id: string) => void;
  setStartedSystem: (started: boolean) => void;
  sectionList: { id: string; title: string }[];
};

export default function SectionButtons({
  collapsed,
  activeSection,
  setActiveSection,
  setStartedSystem,
  sectionList
}: Props) {
  return (
    <div className={`flex ${collapsed ? 'flex-col' : 'flex-wrap'} gap-2`}>
      {sectionList.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            setActiveSection(section.id);
            setStartedSystem(false);
          }}
          className={`transition ${
            collapsed
              ? 'w-12 h-12 flex items-center rounded-md justify-center border-2 border-[var(--base-2)]'
              : 'px-4 py-2 rounded-full border-2 border-[var(--base-2)]'
          } ${
            activeSection === section.id
              ? 'bg-[var(--base-2)] text-white font-bold'
              : 'text-white/25 hover:bg-[var(--base-2)] hover:text-white'
          }`}
        >
          {collapsed ? section.title.replace('Section ', '') : section.title}
        </button>
      ))}
    </div>
  );
}
