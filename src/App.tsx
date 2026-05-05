import { useState } from 'react';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { AvatarPreview } from './components/AvatarPreview';
import { OptionPanel } from './components/OptionPanel';
import { BottomBar } from './components/BottomBar';
import type { AssetCategory } from './types/avatar';

import leftBar from './assets/left-bar.svg';
import rightBar from './assets/right-bar.svg';

function App() {
  const [activeTab, setActiveTab] = useState<AssetCategory>('eyes');

  return (
    <div className="min-h-screen w-full bg-primary-bg overflow-visible n
    overflow-x-hidden md:overflow-hidden flex flex-col font-sans relative">
      <div className="absolute inset-0 bg-cover bg-top bg-no-repeat z-0" style={{ backgroundImage: "url('/main-bg2.svg')" }}></div>

      {/* Decorative Side Bars */}
      <img src={leftBar} alt="" className="absolute left-0  md:-left-2 top-0 h-screen w-auto object-contain py-2 z-20 pointer-events-none" />
      <img src={rightBar} alt="" className="absolute -right-22 md:-right-20 lg:-right-25 top-0 h-screen w-auto object-contain py-2 z-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-auto md:h-screen w-full mx-auto rounded-3xl overflow-visible md:overflow-hidden shadow-2xl border border-white/5 my-auto">
        <Topbar />

        <div className="flex-1 flex flex-col md:flex-row relative overflow-visible md:overflow-hidden">
          {/* Left Panel - Visible on mobile for categories */}
          <div className="flex h-full relative" style={{ width: '15%', minWidth: '80px', flexShrink: 0 }}>
            <div className="relative z-10 w-full h-full">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative w-full md:min-w-0 md:min-h-0">
            <div className="flex-1 flex flex-col md:flex-row relative pb-20 md:pb-0 md:min-h-0 overflow-visible md:overflow-hidden">
              <AvatarPreview />

              {/* Desktop View */}
              <div className="hidden md:flex h-full border-l border-white/5 relative" style={{ width: '48%', minWidth: '300px', flexShrink: 0 }}>
                {/* Figma Rectangle 5944 — frosted glass backdrop */}
                <div
                  className="absolute inset-x-0 pointer-events-none z-0"
                  style={{
                    top: '-3.62%',
                    bottom: '-6.1%',
                    background: 'linear-gradient(180deg, rgba(1, 22, 61, 0) 2.09%, rgba(1, 22, 61, 0.7) 28.65%, rgba(1, 22, 61, 0.7) 69.8%, rgba(1, 22, 61, 0) 100%)',
                    opacity: 0.8,
                    backdropFilter: 'blur(21.95px)',
                    WebkitBackdropFilter: 'blur(21.95px)',
                    borderRadius: '36px',
                  }}
                />
                <div className="relative z-10 w-full h-full overflow-y-auto">
                  <OptionPanel activeTab={activeTab} />
                </div>
              </div>

              {/* Mobile Option Panel - Drawer style */}
              <div className="md:hidden absolute bottom-0 w-full rounded-t-3xl border-t border-white/10 bg-black/60 backdrop-blur-xl max-h-[40vh] overflow-y-auto z-30 transition-transform shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <OptionPanel activeTab={activeTab} />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-around p-4 bg-black/40 border-t border-white/10 z-20">
              {(['head', 'eyes', 'hair'] as AssetCategory[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-6 rounded-full text-xs font-bold uppercase transition-all ${activeTab === tab ? 'bg-accent text-black shadow-glow' : 'text-text-muted hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <BottomBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
