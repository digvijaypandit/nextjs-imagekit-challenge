export type FlipMode = "h" | "v" | "h_v";

export type ImageCropMode =
  | "maintain_ratio"
  | "pad_resize"
  | "force"
  | "at_max"
  | "at_max_enlarge"
  | "at_least"
  | "extract"
  | "pad_extract";

export type VideoCropMode =
  | "maintain_ratio"
  | "pad_resize"
  | "force"
  | "at_max"
  | "at_least"
  | "extract";

export type CommonFocusMode =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right";

export type ImageFocusMode =
  | CommonFocusMode
  | "auto"
  | "face"
  | "custom"
  | `object-${string}`;

export type VideoFocusMode = CommonFocusMode;

export type ImageBasicsTransform = {
  width?: number;
  height?: number;
  aspectRatio?: string;
  cropMode?: ImageCropMode;
  focus?: ImageFocusMode;
  x?: number;
  y?: number;
  xc?: number;
  yc?: number;
  zoom?: number;
  dpr?: number | "auto";
};

export type VideoBasicsTransform = {
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  cropMode?: VideoCropMode;
  focus?: VideoFocusMode;
  background?: {
    type: "solid" | "blurred";
    color?: string;
    blurIntensity?: number | "auto";
    brightness?: number;
  };
  border?: {
    width: number | string;
    color: string;
  };
  radius?: number | "max";
  rotate?: 0 | 90 | 180 | 270 | 360;
};

// --- Overlay Types ---
export type OverlayBase = {
  x?: number | string;
  y?: number | string;
  focus?: CommonFocusMode;
  startOffset?: number | string;
  endOffset?: number | string;
  duration?: number | string;
};

export type ImageOverlay = OverlayBase & {
  type: "image";
  src: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  cropMode?: ImageCropMode;
  border?: string;
  bg?: string; // Made optional to match the error you got
  radius?: number | "max";
  rotation?: number;
  opacity: number;
  flip?: FlipMode;
};

export type TextOverlay = OverlayBase & {
  type: "text";
  text: string;
  fontSize: number | string;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  align: "left" | "center" | "right";
  typography?: ("b" | "i" | "strikethrough")[];
  padding?: string;
  bg?: string;
  radius?: number;
  rotation?: number;
  lineHeight?: number | string;
  opacity: number;
  bold?: string; // Made optional to match the error you got
  italic?: string; // Made optional
  strike?: string; // Made optional
  flip?: boolean | FlipMode; // Corrected to allow both boolean and FlipMode
};

export type SolidBlock = OverlayBase & {
  type: "solid";
  color: string;
  width?: number | string;
  height?: number | string;
  opacity: number;
  radius?: number | "max";
};

export type VideoOverlay = OverlayBase & {
  type: "video";
  src: string;
  width?: number | string;
  height?: number | string;
  opacity: number;
};

export type Overlay = ImageOverlay | TextOverlay | SolidBlock | VideoOverlay;

export type ImageEnhancements = {
  blur?: number;
  sharpen?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  noise?: number;
  shadow?: {
    blur?: number;
    saturation?: number;
    offsetX?: number;
    offsetY?: number;
  };
  background?: {
    type: "solid" | "blurred" | "dominant";
    color?: string;
    blurIntensity?: number | "auto";
    brightness?: number;
  };
};

export type VideoEnhancements = {
  thumbnail?: {
    time?: number | string;
    width?: number;
    height?: number;
    aspectRatio?: string;
    cropMode?: VideoCropMode;
    focus?: VideoFocusMode;
    border?: {
      width: number;
      color: string;
    };
    bg?: string;
    radius?: number | "max";
  };
  trimming?: {
    startOffset?: number | string;
    endOffset?: number | string;
    duration?: number | string;
  };
};

export type Audio = {
  mute?: boolean;
  extractAudio?: boolean;
};

export type AiMagic = {
  background?: {
    remove?: boolean;
    mode?: "standard" | "economy";
    changePrompt?: string;
    generativeFill?: {
      prompt?: string;
      width?: number;
      height?: number;
      cropMode: "pad_resize" | "pad_extract";
    };
  };
  editing?: {
    prompt?: string;
    retouch?: boolean;
    upscale?: boolean;
  };
  shadowLighting?: {
    dropShadow?: {
      azimuth?: number;
      elevation?: number;
      saturation?: number;
    };
  };
  generation?: {
    textPrompt?: string;
    variation?: boolean;
  };
  cropping?: {
    type?: "smart" | "face" | "object";
    objectName?: string;
    zoom?: number;
    width?: number;
    height?: number;
  };
};

// Main Configuration for the entire component
export type TransformationConfig = {
  type: "IMAGE" | "VIDEO";
  basics?: ImageBasicsTransform | VideoBasicsTransform;
  overlays?: Overlay[];
  enhancements?: ImageEnhancements | VideoEnhancements;
  ai?: AiMagic;
  audio?: Audio;
};
// src/types/transformations.ts

export type Enhancements = {
  blur?: number;
  sharpen?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  noise?: number;
  shadow?: {
    blur?: number;
    saturation?: number;
    offsetX?: number;
    offsetY?: number;
  };
  background?: {
    type: "solid" | "blurred" | "dominant";
    color?: string;
    blurIntensity?: number | "auto";
    brightness?: number;
  };
};
