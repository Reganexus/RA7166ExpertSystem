import Image from 'next/image';
import FavIcon from '@/app/favicon.ico';
import sectionList from '@/data/section-list.json';
import { RiContractLeftLine, RiContractRightLine, RiQuestionLine, RiCloseFill } from "react-icons/ri";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
  setStartedSystem: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
};

export default function Sidebar({
  collapsed,
  setCollapsed,
  activeSection,
  setActiveSection,
  setStartedSystem,
  mobileOpen,
  setMobileOpen
}: SidebarProps) {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full bg-[var(--base-1)] transition-transform duration-300 z-50
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 flex flex-col gap-4 
        ${collapsed ? 'p-4 w-[80px]' : 'p-8 w-full md:w-auto'} ${mobileOpen ? 'p-4' : 'pr-16'}`}
    >
      {/* MOBILE CLOSE BUTTON */}
      <div className="md:hidden self-end">
        <button
          onClick={() => setMobileOpen(false)}
          className="text-white"
        >
          <RiCloseFill size={40} />
        </button>
      </div>

      {/* Collapse/Expand (Desktop only) */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={`hidden md:flex items-center justify-center cursor-pointer text-white hover:text-[var(--base-3)] ${collapsed ? "w-12 h-12" : "self-end w-12 h-12"}`}
      >
        {collapsed ? <RiContractRightLine size={40} /> : <RiContractLeftLine size={40} />}
      </div>

      {/* Logo / Title */}
      {collapsed ? (
        <div className="mt-4 w-12 h-12 flex items-center justify-center">
          <Image className="rounded-full" src={FavIcon} alt="icon" width={40} height={40} />
        </div>
      ) : (
        <h1 className={`${mobileOpen ? 'text-5xl' : 'text-7xl'} font-bold mt-8 mb-8 leading-tight`}>RA 7166 <br /> Expert System</h1>
      )}

      {/* Question Mark Button */}
      {collapsed ? (
        <button
          onClick={() => !mobileOpen && setCollapsed(false)}
          className="flex items-center justify-center w-12 h-12 text-white"
        >
          <RiQuestionLine size={32} />
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="px-4 py-2 rounded-full w-max text-lg font-medium border-2 border-[var(--base-2)]">
            What is RA 7166?
          </div>
          <p className="md:text-xl text-sm text-justify text-white/75">
            Also known as the <strong>Synchronized National and Local Elections and Electoral Reforms Act of 1991</strong>, it is a significant piece of legislation in the Philippines to reform elections.
          </p>
        </div>
      )}

      <hr
        className={`border-2 border-white/25 my-4 rounded-full 
    ${collapsed ? 'w-12' : 'w-full'}`}
      />


      {/* Section Buttons */}
      <div className={`flex ${collapsed ? 'flex-col' : 'flex-wrap'} gap-2`}>
        {sectionList.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              setStartedSystem(false);
              setMobileOpen(false); // Close mobile menu on selection
            }}
            className={`transition ${collapsed
              ? "w-12 h-12 flex items-center rounded-md justify-center border-2 border-[var(--base-2)]"
              : "px-4 py-2 rounded-full border-2 border-[var(--base-2)]"
              } ${activeSection === section.id
                ? "bg-[var(--base-2)] text-white font-bold"
                : "text-white/50 hover:bg-[var(--base-2)] hover:text-white"
              }`}
          >
            {collapsed ? section.title.replace("Section ", "") : section.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
