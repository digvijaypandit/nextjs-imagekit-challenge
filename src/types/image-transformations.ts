export type CropMode =
  | "maintain_ratio"
  | "pad_resize"
  | "force"
  | "at_max"
  | "at_max_enlarge"
  | "at_least"
  | "extract"
  | "pad_extract";

export type FocusMode =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right"
  | "auto"
  | "face"
  | "custom"
  | `object-${string}`; // e.g. object-dog, object-car

export type BasicsTransform = {
  width?: number; // w
  height?: number; // h
  aspectRatio?: string; // ar e.g. "16-9"
  cropMode?: CropMode; // c
  focus?: FocusMode; // fo
  x?: number; // for extract/custom focus
  y?: number;
  xc?: number;
  yc?: number;
  zoom?: number; // z
  dpr?: number | "auto"; // dpr
};

export type FlipMode = "h" | "v" | "h_v";

export type ImageOverlay = {
  type: "image";
  src: string; // i
  width?: number; // w
  height?: number; // h
  x?: number; // position
  y?: number;
  opacity?: number; // o (0–100)
  bgColor?: string; // bg
  border?: string; // b e.g. "5_FFF000"
  radius?: number | "max"; // r
  rotation?: number; // rt
  flip?: FlipMode; // fl
};

export type TextOverlay = {
  type: "text";
  text: string; // i
  fontSize?: number; // fs
  fontFamily?: string; // ff
  color?: string; // co
  backgroundColor?: string; // bg
  padding?: string; // pa shorthand
  align?: "left" | "center" | "right"; // lfo
  bold?: string;
  italic?: string;
  strike?: string;
  rotation?: number; // rt
  flip?: FlipMode; // fl
};

export type GradientBlock = {
  type: "gradient";
  direction?: string; // ld
  fromColor?: string; // from
  toColor?: string; // to
  stopPoint?: number; // sp
  width?: number; // w
  height?: number; // h
  radius?: number; // r
};

export type SolidBlock = {
  type: "solid";
  color: string; // bg
  backgroundColor?: string;
  width?: number;
  height?: number;
  opacity?: number;
  radius?: number;
};

export type ResetAll = {
  type: undefined;
  text: undefined;
  src: undefined;
  fromColor: undefined;
  toColor: undefined;
  color: undefined;
  width: undefined;
  height: undefined;
  opacity: undefined;
};

export type Overlay =
  | ImageOverlay
  | TextOverlay
  | GradientBlock
  | SolidBlock
  | ResetAll;

export type Enhancements = {
  blur?: number; // bl (0–100)
  sharpen?: number; // e-sharpen (0–10)
  brightness?: number; // br (0–200) or your scale
  contrast?: number; // ct (0–200)
  saturation?: number; // st (0–200)
  noise?: number; // ns (0–100)
  shadow?: {
    blur?: number;
    saturation?: number;
    offsetX?: number;
    offsetY?: number;
  };
  background?: {
    type: "solid" | "blurred" | "dominant";
    color?: string;
    blurIntensity?: number;
    brightness?: number;
  };
};

export type AiMagic = {
  background?: {
    remove?: boolean; // e-removedotbg or e-bgremove
    mode?: "standard" | "economy";
    changePrompt?: string; // e-changebg
    generativeFill?: {
      prompt?: string;
      width?: number;
      height?: number;
      cropMode: "pad_resize" | "pad_extract";
    };
  };
  editing?: {
    prompt?: string; // e-edit
    retouch?: boolean; // e-retouch
    upscale?: boolean; // e-upscale
  };
  shadowLighting?: {
    dropShadow?: {
      azimuth?: number; // 0–360
      elevation?: number; // 0–90
      saturation?: number; // 0–100
    };
  };
  generation?: {
    textPrompt?: string; // ik-genimg
    variation?: boolean; // e-genvar
  };
  cropping?: {
    type?: "smart" | "face" | "object";
    objectName?: string; // for object aware
    zoom?: number;
    width?: number;
    height?: number;
  };
};
