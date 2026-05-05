import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAvatarStore } from '../store/avatarStore';
import { assets } from '../data/assets';
import {
  FEMALE_HAIR_IDS,
  FEMALE_EYE_IDS,
  ASSET_POSITIONS,
  ANIMATION_CONFIG,
  HAIR_REGEX,
} from '../constants/avatar';
import bodySrc from '../assets/body.svg';

export const AvatarPreview: React.FC = () => {
  const { head, eyes, hair, colors } = useAvatarStore();

  const getAssetSrc = (type: 'head' | 'eyes' | 'hair', id: string) => {
    const item = assets[type].find((a) => a.id === id);
    return item ? item.src : '';
  };

  const headSrc = getAssetSrc('head', head);
  const eyesSrc = getAssetSrc('eyes', eyes);
  const hairSrc = getAssetSrc('hair', hair);

  const isFemaleHair = FEMALE_HAIR_IDS.has(hair);
  const isFemaleEyes = FEMALE_EYE_IDS.has(eyes);
  const hairId = (hair || '').toLowerCase();
  const isFrontHair = HAIR_REGEX.isFront.test(hairId);
  const isBackHair = HAIR_REGEX.isBack.test(hairId);
  const hairZClass = isFrontHair ? 'z-30' : isBackHair ? 'z-10' : 'z-10';

  return (
    <div className="w-full md:flex-1 md:h-full flex justify-center items-start md:items-center z-0 pt-4 md:pt-20 py-4 min-h-[320px] md:min-h-0">
      <div className="relative lg:ml-70 w-[75vw] max-w-[320px] h-auto md:h-full md:w-auto md:max-w-none max-h-[85vh] scale-x-[-1] aspect-[305/689] origin-center">
        {/* Body Layer */}
        <img
          src={bodySrc}
          alt="Avatar body"
          className="absolute z-0"
          style={{
            width: ASSET_POSITIONS.body.width,
            height: ASSET_POSITIONS.body.height,
            top: ASSET_POSITIONS.body.top,
            left: ASSET_POSITIONS.body.left,
            transform: 'translateX(-50%) scaleX(-1)'
          }}
          draggable={false}
        />

        {/* Head Layer */}
        <AnimatePresence mode="wait">
          {headSrc && (
            <motion.img
              key={`head-${head}`}
              src={headSrc}
              className="absolute z-20 origin-bottom"
              style={{
                width: ASSET_POSITIONS.head.width,
                height: ASSET_POSITIONS.head.height,
                top: ASSET_POSITIONS.head.top,
                left: ASSET_POSITIONS.head.left,
                transform: 'translateX(-50%)',
                filter: `drop-shadow(0px 4px 10px ${colors.head}40)`
              }}
              initial={ANIMATION_CONFIG.initial}
              animate={ANIMATION_CONFIG.animate}
              exit={ANIMATION_CONFIG.exit}
              transition={{ duration: ANIMATION_CONFIG.duration }}
            />
          )}
        </AnimatePresence>

        {/* Eyes Layer */}
        <AnimatePresence mode="wait">
          {eyesSrc && (
            <motion.img
              key={`eyes-${eyes}`}
              src={eyesSrc}
              className="absolute z-20 origin-center"
              style={{
                width: isFemaleEyes ? ASSET_POSITIONS.eyes.femaleWidth : ASSET_POSITIONS.eyes.width,
                height: isFemaleEyes ? ASSET_POSITIONS.eyes.femaleHeight : ASSET_POSITIONS.eyes.height,
                top: ASSET_POSITIONS.eyes.top,
                left: ASSET_POSITIONS.eyes.left,
                transform: 'translateX(-50%)',
                filter: `drop-shadow(0px 2px 5px ${colors.eyes}80)`   
              }}
              initial={ANIMATION_CONFIG.initial}
              animate={ANIMATION_CONFIG.animate}
              exit={ANIMATION_CONFIG.exit}
              transition={{ duration: ANIMATION_CONFIG.duration }}
            />
          )}
        </AnimatePresence>

        {/* Hair Layer */}
        <AnimatePresence mode="wait">
          {hairSrc && (
            <motion.img
              key={`hair-${hair}`}
              src={hairSrc}
              className={`absolute ${hairZClass} origin-top`}
              style={{
                width: isFemaleHair ? ASSET_POSITIONS.hair.femaleWidth : ASSET_POSITIONS.hair.maleWidth,
                height: isFemaleHair ? ASSET_POSITIONS.hair.femaleHeight : ASSET_POSITIONS.hair.maleHeight,
                top: isFemaleHair ? ASSET_POSITIONS.hair.femaleTop : ASSET_POSITIONS.hair.maleTop,
                left: isFemaleHair ? ASSET_POSITIONS.hair.femaleLeft : ASSET_POSITIONS.hair.maleLeft,
                transform: 'translateX(-50%)',
                filter: `drop-shadow(0px 4px 15px ${colors.hair}60)`
              }}
              initial={{ ...ANIMATION_CONFIG.initial, y: -2 }}
              animate={{ ...ANIMATION_CONFIG.animate, y: 0 }}
              exit={{ ...ANIMATION_CONFIG.exit, y: -2 }}
              transition={{ duration: ANIMATION_CONFIG.duration }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};



