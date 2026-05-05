import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  FlipHorizontal,
  Layers,
  Move,
  Paintbrush,
  RotateCcw,
  RotateCw,
  Shuffle,
  Sliders,
  X
} from 'lucide-react';
import { assets } from '../data/assets';
import { useAvatarStore } from '../store/avatarStore';
import type { AssetCategory } from '../types/avatar';
import { AssetCard } from './AssetCard';
import { ColorPicker } from './ColorPicker';

interface AvatarEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: AssetCategory;
  setActiveTab: (tab: AssetCategory) => void;
}

interface RangeFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}

const COLOR_SWATCHES = ['#e89623', '#23a0e8', '#e82354', '#4ce823', '#ffffff', '#222222'];

const TAB_LABELS: Record<AssetCategory, string> = {
  head: 'Head',
  eyes: 'Eyes',
  hair: 'Hair',
};

const RangeField: React.FC<RangeFieldProps> = ({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  format,
}) => {
  const display = format ? format(value) : `${value}`;

  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          {label}
        </span>
        <span className="text-white/80">{display}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
      />
    </label>
  );
};

export const AvatarEditorDrawer: React.FC<AvatarEditorDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  const {
    head,
    eyes,
    hair,
    colors,
    transforms,
    setHead,
    setEyes,
    setHair,
    setColor,
    setTransform,
    resetTransform,
    randomize,
    reset,
  } = useAvatarStore();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeAssetId = activeTab === 'head' ? head : activeTab === 'eyes' ? eyes : hair;
  const activeColor = colors[activeTab];
  const activeTransform = transforms[activeTab];

  const setAsset = (id: string) => {
    if (activeTab === 'head') setHead(id);
    if (activeTab === 'eyes') setEyes(id);
    if (activeTab === 'hair') setHair(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close avatar editor"
          />

          <motion.aside
            className="absolute right-0 top-0 h-full w-full md:w-[420px] bg-gradient-to-b from-[#0a1d31] via-[#0c2238] to-[#06131f] border-l border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 240, damping: 30 }}
          >
            <div className="flex h-full flex-col font-[var(--font-display)]">
              <div className="px-6 pt-6 pb-4 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.4em] text-text-muted">Avatar</p>
                    <h2 className="text-2xl font-black text-white">Editor Console</h2>
                    <p className="text-xs text-text-muted mt-1">Fine-tune every layer with full control.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:text-white hover:bg-white/20 transition"
                    aria-label="Close editor"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={randomize}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/20 transition"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                    Randomize
                  </button>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 rounded-full bg-accent/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-accent transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset All
                  </button>
                </div>

                <div className="mt-5 flex gap-2">
                  {(['head', 'eyes', 'hair'] as AssetCategory[]).map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 rounded-2xl px-3 py-2 text-xs font-bold uppercase tracking-widest transition ${
                          isActive
                            ? 'bg-accent text-black shadow-[0_0_18px_rgba(0,224,255,0.45)]'
                            : 'bg-white/5 text-text-muted hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {TAB_LABELS[tab]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-10 pt-6 space-y-8">
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-muted">
                      <Sliders className="h-3.5 w-3.5" />
                      Assets
                    </div>
                    <span className="text-[11px] text-text-muted">{assets[activeTab].length} options</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {assets[activeTab].map((item) => (
                      <AssetCard
                        key={item.id}
                        item={item}
                        isSelected={activeAssetId === item.id}
                        onSelect={setAsset}
                      />
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-muted">
                    <Paintbrush className="h-3.5 w-3.5" />
                    Color Tone
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_SWATCHES.map((swatch) => (
                      <button
                        key={swatch}
                        onClick={() => setColor(activeTab, swatch)}
                        className={`h-9 w-9 rounded-xl transition-transform hover:scale-105 ${
                          activeColor.toLowerCase() === swatch ? 'ring-2 ring-accent ring-offset-2 ring-offset-[#0f2a44]' : ''
                        }`}
                        style={{ backgroundColor: swatch }}
                        aria-label={`Set color ${swatch}`}
                      />
                    ))}
                  </div>
                  <ColorPicker color={activeColor} onChange={(value) => setColor(activeTab, value)} />
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-muted">
                      <Move className="h-3.5 w-3.5" />
                      Position
                    </div>
                    <button
                      onClick={() => resetTransform(activeTab)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition"
                    >
                      Reset Part
                    </button>
                  </div>
                  <RangeField
                    label="Offset X"
                    value={activeTransform.x}
                    min={-30}
                    max={30}
                    step={1}
                    unit="%"
                    onChange={(value) => setTransform(activeTab, { x: value })}
                  />
                  <RangeField
                    label="Offset Y"
                    value={activeTransform.y}
                    min={-30}
                    max={30}
                    step={1}
                    unit="%"
                    onChange={(value) => setTransform(activeTab, { y: value })}
                  />
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-muted">
                    <RotateCw className="h-3.5 w-3.5" />
                    Transform
                  </div>
                  <RangeField
                    label="Scale"
                    value={activeTransform.scale}
                    min={0.6}
                    max={1.6}
                    step={0.01}
                    onChange={(value) => setTransform(activeTab, { scale: value })}
                    format={(value) => value.toFixed(2)}
                  />
                  <RangeField
                    label="Rotation"
                    value={activeTransform.rotate}
                    min={-35}
                    max={35}
                    step={1}
                    unit="deg"
                    onChange={(value) => setTransform(activeTab, { rotate: value })}
                  />
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-muted">
                    <Layers className="h-3.5 w-3.5" />
                    Layering
                  </div>
                  <RangeField
                    label="Opacity"
                    value={activeTransform.opacity}
                    min={0.1}
                    max={1}
                    step={0.05}
                    onChange={(value) => setTransform(activeTab, { opacity: value })}
                    format={(value) => value.toFixed(2)}
                  />
                  <RangeField
                    label="Depth"
                    value={activeTransform.zIndex}
                    min={0}
                    max={60}
                    step={1}
                    onChange={(value) => setTransform(activeTab, { zIndex: value })}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTransform(activeTab, { visible: !activeTransform.visible })}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                        activeTransform.visible
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-text-muted'
                      }`}
                    >
                      {activeTransform.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      {activeTransform.visible ? 'Visible' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => setTransform(activeTab, { flipX: !activeTransform.flipX })}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                        activeTransform.flipX
                          ? 'bg-accent text-black'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <FlipHorizontal className="h-4 w-4" />
                      Flip X
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
