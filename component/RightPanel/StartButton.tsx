import { RiNavigationFill } from 'react-icons/ri';

type Props = {
  onClick: () => void;
};

export default function StartButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-white/75 flex gap-4 items-center justify-center md:mt-8 mt-0 w-max px-8 py-4 rounded-full md:text-xl text-md font-semibold transition-all ease-in-out bg-[var(--base-1)] hover:bg-[var(--base-2)] hover:text-white"
    >
      Start Expert System <RiNavigationFill />
    </button>
  );
}
