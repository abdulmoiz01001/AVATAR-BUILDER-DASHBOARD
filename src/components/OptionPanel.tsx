import React from 'react';
import { useAvatarStore } from '../store/avatarStore';
import { assets } from '../data/assets';
import type { AssetCategory } from '../types/avatar';
import { AssetCard } from './AssetCard';
import { RotateCcw, Shuffle } from 'lucide-react';

interface OptionPanelProps {
  activeTab: AssetCategory;
}

export const OptionPanel: React.FC<OptionPanelProps> = ({ activeTab }) => {
  const store = useAvatarStore();
  const activeAssetId = store[activeTab];
  const activeColor = store.colors[activeTab];

  const setAsset = (id: string) => {
    if (activeTab === 'head') store.setHead(id);
    if (activeTab === 'eyes') store.setEyes(id);
    if (activeTab === 'hair') store.setHair(id);
  };

  const setColor = (color: string) => {
    store.setColor(activeTab, color);
  };

  const categoryAssets = assets[activeTab];

  return (
    <div className="w-full p-4 md:p-6 flex flex-col h-full relative z-10 space-y-4 md:space-y-8 bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-t-3xl md:rounded-none">

      {/* Title & Actions */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="hidden md:block text-xl font-black uppercase tracking-widest text-white">{activeTab}</h2>
        <div className="flex space-x-2">
          <button
            onClick={store.randomize}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-all hover:scale-105 tooltip"
            title="Randomize"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={store.reset}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-all hover:scale-105"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Asset List / Horizontal Slider on Mobile */}
      <div className="flex md:grid flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 pb-2 md:pb-0 scrollbar-hide">
        {categoryAssets.map((item) => (
          <AssetCard
            key={item.id}
            item={item}
            isSelected={activeAssetId === item.id}
            onSelect={setAsset}
          />
        ))}
      </div>

      {/* Color Section */}
      <div className="border-t border-white/10 pt-4 md:pt-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3 md:mb-4">Color</h3>

        {/* Draggable Color Input */}
        <div className="mb-2 md:mb-4 flex items-center space-x-3">
          <input
            type="color"
            value={activeColor}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-110 transition-transform border-2 border-white/20"
            title="Drag or click to select color"
          />
          <div className="flex-1">

          </div>
        </div>



        {/* <ColorPicker color={activeColor} onChange={setColor} /> */}
      </div>

    </div>
  );
};
