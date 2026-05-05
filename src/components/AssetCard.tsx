import React from 'react';
import type { AssetOption } from '../types/avatar';

interface AssetCardProps {
  item: AssetOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className="cursor-pointer rounded-2xl w-[150px] h-[200px] md:w-[190px] md:h-[250px] transition-all duration-300 ease-in-out overflow-hidden mx-auto flex-shrink-0"
      style={{
        backgroundImage: isSelected
          ? "url('/equiped.png')"
          : "url('/unequiped-bg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full mt-10 h-44 flex items-center justify-center relative z-0">
        <img
          src={item.src}
          alt={item.id}
          className="max-w-[70%] max-h-[70%] object-contain drop-shadow-md"
        />
      </div>
    </div>
  );
};