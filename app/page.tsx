'use client';

import { useState } from 'react';
import sectionList from '@/data/section-list.json';
import SectionCard from '@/component/SectionCard';
import QuestionModal from '@/component/QuestionModal';
import { getSectionLogic } from '@/utils/getSectionLogic';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const logic = activeSection ? getSectionLogic(activeSection) : null;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">RA 7166 Expert System</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sectionList.map((section) => (
          <SectionCard
            key={section.id}
            title={section.title}
            description={section.description}
            offenses={section.offenses}
            onClick={() => setActiveSection(section.id)}
          />
        ))}
      </div>

      {logic && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full">
            <QuestionModal logic={logic} onClose={() => setActiveSection(null)} />
          </div>
        </div>
      )}
    </main>
  );
}
