export type AssetCategory = "head" | "eyes" | "hair";

export type AvatarTransform = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  flipX: boolean;
  opacity: number;
  zIndex: number;
  visible: boolean;
};

export type AvatarTransforms = Record<AssetCategory, AvatarTransform>;

export type AvatarState = {
  head: string;
  eyes: string;
  hair: string;
  colors: {
    head: string;
    eyes: string;
    hair: string;
  };
  transforms: AvatarTransforms;
  setHead: (id: string) => void;
  setEyes: (id: string) => void;
  setHair: (id: string) => void;
  setColor: (part: AssetCategory, color: string) => void;
  setTransform: (part: AssetCategory, transform: Partial<AvatarTransform>) => void;
  resetTransform: (part: AssetCategory) => void;
  randomize: () => void;
  reset: () => void;
};

export interface AssetOption {
  id: string;
  src: string;
}

export interface Assets {
  head: AssetOption[];
  eyes: AssetOption[];
  hair: AssetOption[];
  face?: AssetOption[];
}
