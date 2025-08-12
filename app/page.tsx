'use client';

import { useEffect, useState } from 'react';
import sectionList from '@/data/section-list.json';
import { getSectionLogic } from '@/utils/getSectionLogic';
import Sidebar from '@/component/Sidebar/Sidebar';
import StartButton from '@/component/RightPanel/StartButton';
import ExpertSystemPanel from '@/component/RightPanel/ExpertSystemPanel';
import SectionInfo from '@/component/RightPanel/SectionInfo';
import { RiMenuFill } from "react-icons/ri";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [startedSystem, setStartedSystem] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Open sidebar by default only on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileOpen(true);
    }
  }, []);

  const selectedSection = sectionList.find(s => s.id === activeSection);
  const logic = startedSystem && activeSection ? getSectionLogic(activeSection) : null;

  return (
    <main
      className="relative h-dvh grid grid-cols-1 transition-[grid-template-columns] duration-300 ease-in-out"
      style={{
        gridTemplateColumns: collapsed && !mobileOpen
          ? '80px 1fr'
          : !collapsed && !mobileOpen
            ? 'minmax(240px, 40%) 1fr'
            : undefined
      }}
    >
      {/* MOBILE HAMBURGER BUTTON */}
      {!mobileOpen && (
        <div className="absolute top-4 left-4 z-50 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md bg-[var(--base-1)] text-white"
          >
            <RiMenuFill size={28} />
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setStartedSystem={setStartedSystem}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* RIGHT COLUMN */}
      <div className="p-4 md:p-8 h-full w-[100dvw] md:w-full flex flex-col bg-[var(--base-4)] text-white">
        {selectedSection ? (
          <>
            {/* Two-column on desktop, stacked on mobile */}
            <div className="flex flex-col gap-8 md:p-8 h-full md:pt-0 pt-24 md:grid md:grid-cols-[60%_40%]">
              {/* Section Info + Start Button */}
              {/* Section Info + Start Button */}
              <div className="flex flex-col gap-4 justify-center">
                <SectionInfo section={selectedSection} />
                {!startedSystem && (
                  <StartButton
                    onClick={() => {
                      setStartedSystem(true);
                      if (window.innerWidth >= 768) {
                        setCollapsed(true);
                      }
                    }}
                  />
                )}
              </div>

              {/* Expert System Panel */}
              {startedSystem && logic && (
                <div className="flex justify-center items-center h-full">
                  <ExpertSystemPanel logic={logic} onClose={() => setStartedSystem(false)} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-white/50">
            <p className="text-xl">Select a section to begin</p>
          </div>
        )}
      </div>
    </main>
  );
}
