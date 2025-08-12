import { RiQuestionLine } from 'react-icons/ri';

type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export default function SectionIntro({ collapsed, setCollapsed }: Props) {
  return collapsed ? (
    <button
      onClick={() => setCollapsed(false)}
      className="flex items-center justify-center w-12 h-12 text-white"
    >
      <RiQuestionLine size={46} />
    </button>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-2 rounded-full w-max text-2xl font-medium border-2 border-[var(--base-2)]">
        What is RA 7166?
      </div>
      <p className="text-xl text-justify text-white/75">
        Also known as the <strong>Synchronized National and Local Elections and Electoral Reforms Act of 1991,</strong> is a significant piece of legislation in the Philippines. It was enacted to address issues in the country's electoral system and to establish a consistent schedule for elections.
      </p>
    </div>
  );
}
