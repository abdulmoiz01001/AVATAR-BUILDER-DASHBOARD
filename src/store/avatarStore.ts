import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AvatarState, AvatarTransforms, AssetCategory } from '../types/avatar';
import { assets } from '../data/assets';

const createDefaultColors = () => ({
  head: '#ffffff',
  eyes: '#ffffff',
  hair: '#e89623',
});

const createDefaultTransforms = (): AvatarTransforms => ({
  head: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    flipX: false,
    opacity: 1,
    zIndex: 20,
    visible: true,
  },
  eyes: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    flipX: false,
    opacity: 1,
    zIndex: 30,
    visible: true,
  },
  hair: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    flipX: false,
    opacity: 1,
    zIndex: 40,
    visible: true,
  },
});

const createDefaultState = () => ({
  head: assets.head[0]?.id || 'head1',
  eyes: assets.eyes[0]?.id || 'eyes1',
  hair: assets.hair[0]?.id || 'hair1',
  colors: createDefaultColors(),
  transforms: createDefaultTransforms(),
});

const defaultState = createDefaultState();

export const useAvatarStore = create<AvatarState>()(
  persist(
    (set) => ({
      ...defaultState,
      setHead: (id) => set({ head: id }),
      setEyes: (id) => set({ eyes: id }),
      setHair: (id) => set({ hair: id }),
      setColor: (part, color) =>
        set((state) => ({
          colors: {
            ...state.colors,
            [part]: color,
          },
        })),
      setTransform: (part: AssetCategory, transform) =>
        set((state) => ({
          transforms: {
            ...state.transforms,
            [part]: {
              ...state.transforms[part],
              ...transform,
            },
          },
        })),
      resetTransform: (part: AssetCategory) =>
        set((state) => ({
          transforms: {
            ...state.transforms,
            [part]: createDefaultTransforms()[part],
          },
        })),
      randomize: () => {
        const randomHead = assets.head[Math.floor(Math.random() * assets.head.length)].id;
        const randomEyes = assets.eyes[Math.floor(Math.random() * assets.eyes.length)].id;
        const randomHair = assets.hair[Math.floor(Math.random() * assets.hair.length)].id;
        // Random bright color for fun
        const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        set({
          head: randomHead,
          eyes: randomEyes,
          hair: randomHair,
          colors: {
            head: '#ffffff', // Usually head color is skin tone, keeping it simple or randomized
            eyes: '#ffffff', // Eyes usually keep original color
            hair: randomColor(), // Random hair color
          },
          transforms: createDefaultTransforms(),
        });
      },
      reset: () => set(createDefaultState()),
    }),
    {
      name: 'avatar-storage',
    }
  )
);
