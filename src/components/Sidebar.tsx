import React from 'react';
import type { AssetCategory } from '../types/avatar';

interface SidebarProps {
  activeTab: AssetCategory;
  setActiveTab: (tab: AssetCategory) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: AssetCategory[] = ['head', 'eyes', 'hair'];

  return (
    <div className="flex flex-col items-center justify-start pt-10 md:pt-16 px-4 md:px-0 space-y-4 md:space-y-6 relative z-10 w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-20 md:w-32 py-1.5 md:py-2.5 rounded-lg rounded-tr-[25px] text-center uppercase font-semibold tracking-wider md:tracking-widest text-[10px] md:text-sm transition-all duration-300 ease-in-out ${isActive
              ? 'text-cyan-300 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,255,255,0.25)] backdrop-blur-md scale-105'
              : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105'
              }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
