// Avatar positioning and styling constants

export const FEMALE_HAIR_IDS = new Set([
  'Front_Hair_00000163064250978651800440000009969031014567592625_.svg',
  'Front_Hair_00000139289125908124651540000005957557532841889438_.svg',
  'Front_hair_00000178914836876860989350000003161906342800198799_.svg',
  'Front_hair_00000026156227329774084920000006587626378747337111_.svg',
  'Front_Hair_00000031927276692159382080000001932037177751727520_.svg'
]);

export const FEMALE_EYE_IDS = new Set(['Group.svg']);

export const AVATAR_DIMENSIONS = {
  body: { width: 305, height: 689 },
  head: { nativeWidth: 156, nativeHeight: 162 },
  eyes: { nativeWidth: 121, nativeHeight: 81 },
  hair: { nativeWidth: 197, nativeHeight: 151 }
};

export const ASSET_POSITIONS = {
  body: {
    width: '100%',
    height: '60%',
    top: '24.2%',
    left: '60%',
  },
  head: {
    width: '55.14%',
    height: '24.51%',
    top: '0.9%',
    left: '31%',
    zIndex: 20,
  },
  eyes: {
    width: '38.67%',
    height: '10.75%',
    femaleWidth: '33.5%',
    femaleHeight: '9.8%',
    top: '10.43%',
    left: '47.5%',
    zIndex: 20,
  },
  hair: {
    femaleWidth: '67.59%',
    maleWidth: '72.59%',
    femaleHeight: '34.91%',
    maleHeight: '22.91%',
    femaleTop: '-8%',
    maleTop: '-7%',
    femaleLeft: '25%',
    maleLeft: '23%',
    zIndex: { front: 30, back: 10, default: 10 },
  }
};

export const ANIMATION_CONFIG = {
  duration: 0.3,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

export const HAIR_REGEX = {
  isFront: /front|fron/i,
  isBack: /back|behind/i,
};
