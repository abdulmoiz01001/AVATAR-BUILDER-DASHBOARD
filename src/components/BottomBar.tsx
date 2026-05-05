import React from 'react';


export const BottomBar: React.FC = () => {
  return (
    <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-[110%] lg:-translate-x-[140%] z-20 w-[300px]">
  <div
    className="flex items-center justify-center space-x-6 px-8 pt-3 bg-no-repeat bg-center bg-contain"
    style={{
      backgroundImage: "url('/bottom-nav-border.svg')",
    }}
  >
    <button className="hover:scale-110 transition-all mb-2 duration-300">
      <img src="/shield.svg" alt="Shield" className="w-8 h-8" />
    </button>

    <button className="hover:scale-110 transition-all mb-2 duration-300">
      <img src="/helmet.svg" alt="Helmet" className="w-8 h-8" />
    </button>

    <button className="hover:scale-110 transition-all mb-2 duration-300">
      <img src="/star.svg" alt="Star" className="w-8 h-8" />
    </button>

    <button className="hover:scale-110 transition-all mb-2 duration-300 relative">
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(0,224,255,0.8)]" />
      <img src="/box.svg" alt="Box" className="w-8 h-8" />
    </button>
  </div>
</div>
  );
};
