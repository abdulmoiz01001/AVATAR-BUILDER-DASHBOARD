import React, { useEffect, useMemo, useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const normalizeHex = (value: string) => {
    if (!value) return '#E89623';
    if (value.startsWith('#') && /^#([0-9a-fA-F]{3}){1,2}$/.test(value)) {
      if (value.length === 4) {
        const r = value[1];
        const g = value[2];
        const b = value[3];
        return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
      }
      return value.toUpperCase();
    }
    return '#E89623';
  };

  const hslToHex = (hue: number, saturation: number, lightness: number) => {
    const s = saturation / 100;
    const l = lightness / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (hue >= 0 && hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue >= 60 && hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue >= 120 && hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue >= 180 && hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue >= 240 && hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    const toHex = (value: number) => {
      const hex = Math.round((value + m) * 255).toString(16).padStart(2, '0');
      return hex.toUpperCase();
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToRgb = (hex: string) => {
    const value = normalizeHex(hex).slice(1);
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return { r, g, b };
  };

  const [hexInput, setHexInput] = useState(normalizeHex(color));

  useEffect(() => {
    setHexInput(normalizeHex(color));
  }, [color]);

  const displayHex = useMemo(() => normalizeHex(color), [color]);
  const rgb = useMemo(() => hexToRgb(displayHex), [displayHex]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl space-y-4 text-black relative w-64 mt-4">
      <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45"></div>
      
      {/* Gradient preview box (simulated for UI) */}
      <div 
        className="h-32 rounded-xl border border-gray-200 relative overflow-hidden shadow-inner"
        style={{ backgroundColor: displayHex }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent mix-blend-multiply"></div>
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white shadow-md bg-transparent"></div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="360"
        className="w-full h-3 rounded-full appearance-none outline-none cursor-pointer"
        style={{
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
        }}
        onChange={(e) => {
          const nextHex = hslToHex(Number(e.target.value), 100, 50);
          onChange(nextHex);
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Pick</label>
        <input
          type="color"
          value={displayHex}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-10 w-14 rounded-lg border border-gray-200 bg-white"
        />
      </div>

      {/* Hex / RGB inputs */}
      <div className="flex justify-between items-center space-x-2 text-xs font-bold text-gray-500">
        <div className="flex flex-col flex-1">
          <span className="mb-1">Hex</span>
          <input
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value.toUpperCase())}
            onBlur={() => onChange(normalizeHex(hexInput))}
            className="border border-gray-300 rounded-lg p-2 text-black bg-gray-50 text-center uppercase tracking-widest"
          />
        </div>
        <div className="flex flex-col w-12">
          <span className="mb-1 text-center">R</span>
          <div className="border border-gray-300 rounded-lg p-2 text-black bg-gray-50 text-center">{rgb.r}</div>
        </div>
        <div className="flex flex-col w-12">
          <span className="mb-1 text-center">G</span>
          <div className="border border-gray-300 rounded-lg p-2 text-black bg-gray-50 text-center">{rgb.g}</div>
        </div>
        <div className="flex flex-col w-12">
          <span className="mb-1 text-center">B</span>
          <div className="border border-gray-300 rounded-lg p-2 text-black bg-gray-50 text-center">{rgb.b}</div>
        </div>
      </div>
    </div>
  );
};
