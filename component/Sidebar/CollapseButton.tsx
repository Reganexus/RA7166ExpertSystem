import { RiContractLeftLine, RiContractRightLine } from 'react-icons/ri';

type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export default function CollapseButton({ collapsed, setCollapsed }: Props) {
  return (
    <div
      onClick={() => setCollapsed(!collapsed)}
      className={`flex items-center justify-center transition ${
        collapsed ? 'w-12 h-12' : 'self-end w-12 h-12'
      } text-white hover:text-[var(--base-3)] cursor-pointer`}
    >
      {collapsed ? <RiContractRightLine size={40} /> : <RiContractLeftLine size={40} />}
    </div>
  );
}
