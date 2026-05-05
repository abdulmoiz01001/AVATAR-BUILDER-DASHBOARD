import React from 'react';


interface TopbarProps {
  onOpenEditor?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenEditor }) => {
  const [active, setActive] = React.useState<'home' | 'shop' | 'rank'>('home');

  const getNavClass = (tab: string) =>
    `flex items-center space-x-2 text-sm font-semibold transition-all duration-300 p-3 
     ${active === tab
      ? 'text-white bg-cover bg-center bg-no-repeat'
      : 'text-text-muted hover:text-white'
    }`;

  return (
    <div className="w-full flex items-center justify-between px-6 sm:px-8 md:px-10 pt-8 pb-2 sm:pt-4 sm:pb-4 bg-transparent z-10">

      {/* LEFT */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
        <img src="/menu.svg" alt="Logo" className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer flex-shrink-0" />

        <nav className="hidden md:flex space-x-1 md:space-x-4">

          {/* HOME */}
          <button
            onClick={() => setActive('home')}
            className={getNavClass('home')}
            style={
              active === 'home'
                ? {
                  backgroundImage: `url('/bg.svg')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '120px',
                  height: '48px'
                }
                : {}
            }
          >
            <img src="/home.svg" alt="New" className="w-6 h-6" />
            <span>HOME</span>
          </button>

          {/* SHOP */}
          <button
            onClick={() => setActive('shop')}
            className={getNavClass('shop')}
            style={
              active === 'shop'
                ? {
                  backgroundImage: `url('/bg.svg')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '120px',
                  height: '48px'
                }
                : {}
            }
          >
            <img src="/shop.svg" alt="Shop" className="w-6 h-6" />
            <span>SHOP</span>
          </button>

          {/* RANK */}
          <button
            onClick={() => setActive('rank')}
            className={getNavClass('rank')}
            style={
              active === 'rank'
                ? {
                  backgroundImage: `url('/bg.svg')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '120px',
                  height: '48px'
                }
                : {}
            }
          >
            <img src="/rank.svg" alt="Rank" className="w-6 h-6" />
            <span>RANK</span>
          </button>

        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">

        {/* Diamonds */}
        <div
          className="flex items-center justify-start space-x-1 sm:space-x-2 pr-3 xs:pr-4 sm:pr-6 md:pr-8 py-1 sm:py-2 rounded-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/bg2.svg')` }}
        >
          <img src="/diamond.svg" alt="diamond" className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 relative -left-1 sm:-left-2" />
          <span className="font-bold text-[10px] xs:text-xs sm:text-md text-white">100</span>
        </div>

        {/* XP - Hidden on smallest screens to prevent crowding */}
        <div
          className="hidden xs:flex items-center space-x-1 sm:space-x-2 pr-4 sm:pr-8 py-1 sm:py-2 rounded-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/bg2.svg')` }}
        >
          <img src="/xp.svg" alt="xp" className="w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12 relative -left-1 sm:-left-2 " />
          <span className="font-bold text-[10px] xs:text-xs sm:text-md text-white">100</span>
        </div>

        {/* Language Button - Text visible on sm and up */}
        <button
          className="hidden sm:flex items-center space-x-1 md:space-x-2 pr-4 sm:pr-8 py-1 sm:py-2 rounded-full text-white font-bold text-xs transition-transform hover:scale-105 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/bg2.svg')` }}
        >
          <img src="/python.svg" alt="python" className="w-6 h-6 sm:w-10 sm:h-10 relative -left-1 sm:-left-2" />
          <span className="inline-block">Python</span>
        </button>

        {/* Settings */}
        <button
          className="p-1 sm:p-2 rounded-xl transition-all hover:scale-105 text-accent bg-center bg-no-repeat bg-contain cursor-pointer"
          onClick={onOpenEditor}
          aria-label="Open avatar editor"
        >
          <img src="/setting.svg" alt="settings" className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};