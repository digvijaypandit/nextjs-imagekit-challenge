import {TransformationConfig} from "@/types";
import {
  AiMagic,
  BasicsTransform,
  Enhancements,
  Overlay,
} from "@/types/image-transformations";
import {
  Audio as VideoAudio,
  BasicsTransform as VideoBasics,
  Enhancements as VideoEnhancements,
  Overlay as VideoOverlay,
} from "@/types/video-transformations";

/* ---------------- BASICS ---------------- */
function basicsToParams(basics: BasicsTransform): string[] {
  const parts: string[] = [];
  if (basics.width) parts.push(`w-${basics.width}`);
  if (basics.height) parts.push(`h-${basics.height}`);
  if (basics.aspectRatio) parts.push(`ar-${basics.aspectRatio}`);
  if (basics.cropMode) parts.push(`cm-${basics.cropMode}`);
  if (basics.focus) parts.push(`fo-${basics.focus}`);
  if (basics.zoom !== undefined) parts.push(`z-${basics.zoom}`);
  if (basics.dpr) parts.push(`dpr-${basics.dpr}`);
  if (basics.xc !== undefined) parts.push(`xc-${basics.xc}`);
  if (basics.yc !== undefined) parts.push(`yc-${basics.yc}`);
  return parts;
}

function videoBasicsToParams(b: VideoBasics): string[] {
  const p: string[] = [];
  if (b.width) p.push(`w-${b.width}`);
  if (b.height) p.push(`h-${b.height}`);
  if (b.aspectRatio) p.push(`ar-${b.aspectRatio}`);
  if (b.cropMode) p.push(`cm-${b.cropMode}`);
  if (b.focus) p.push(`fo-${b.focus}`);
  if (b.rotate !== undefined) p.push(`rt-${b.rotate}`);
  if (b.border) p.push(`b-${b.border}`);
  if (b.radius !== undefined) p.push(`r-${b.radius}`);
  if (b.background) p.push(`bg-${b.background}`);
  return p;
}

/* ---------------- OVERLAYS ---------------- */
function overlaysToParams(overlays: Overlay[]): string[] {
  const parts: string[] = [];

  overlays.forEach(o => {
    if (o.type === "image") {
      const params: string[] = ["l-image", `i-${o.src}`];
      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);
      if (o.x !== undefined) params.push(`lx-${o.x}`);
      if (o.y !== undefined) params.push(`ly-${o.y}`);
      if (o.opacity !== undefined) params.push(`o-${o.opacity}`);
      if (o.bgColor) params.push(`bg-${o.bgColor}`);
      if (o.border) params.push(`b-${o.border}`);
      if (o.radius !== undefined) params.push(`r-${o.radius}`);
      if (o.rotation !== undefined) params.push(`rt-${o.rotation}`);
      if (o.flip) params.push(`fl-${o.flip}`);
      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "text") {
      const params: string[] = ["l-text", `i-${encodeURIComponent(o.text)}`];
      if (o.fontSize) params.push(`fs-${o.fontSize}`);
      if (o.fontFamily) params.push(`ff-${o.fontFamily}`);
      if (o.color) params.push(`co-${o.color.replace("#", "")}`);
      if (o.backgroundColor)
        params.push(`bg-${o.backgroundColor.replace("#", "")}`);
      if (o.padding) params.push(`pa-${o.padding}`);
      if (o.align) params.push(`lfo-${o.align}`);
      if (o.bold) params.push("b-true");
      if (o.italic) params.push("i-true");
      if (o.strike) params.push("s-true");
      if (o.rotation !== undefined) params.push(`rt-${o.rotation}`);
      if (o.flip) params.push(`fl-${o.flip}`);
      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "gradient") {
      const params: string[] = ["l-image", "i-ik_canvas"];

      let gradient = "e-gradient";

      if (o.direction) gradient += `-ld-${o.direction.replace("-", "_")}`;
      if (o.fromColor) gradient += `_from-${o.fromColor.replace("#", "")}`;
      if (o.toColor) gradient += `_to-${o.toColor.replace("#", "")}`;
      if (o.stopPoint !== undefined) gradient += `_sp-${o.stopPoint / 100}`;

      params.push(gradient);

      if (o.width !== undefined) params.push(`w-${o.width}`);
      if (o.height !== undefined) params.push(`h-${o.height}`);
      if (o.radius !== undefined) params.push(`r-${o.radius}`);

      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "solid") {
      const params: string[] = ["l-image", "i-ik_canvas"];
      if (o.color) params.push(`bg-${o.color.replace("#", "")}`);
      if (o.opacity !== undefined) params.push(`o-${o.opacity}`);
      if (o.width !== undefined) params.push(`w-${o.width}`);
      if (o.height !== undefined) params.push(`h-${o.height}`);
      if (o.radius !== undefined) params.push(`r-${o.radius}`);

      params.push("l-end");
      parts.push(params.join(","));
    }
  });

  return parts;
}

const isSet = (value: string | number | undefined | null): boolean =>
  value !== undefined && value !== null && value !== "" && value !== 0;

const encodeInput = (input: string): string => {
  const simplePattern = /^[a-zA-Z0-9@_.-]+$/;

  if (simplePattern.test(input)) {
    return `i-${input}`;
  } else {
    const base64 = btoa(unescape(encodeURIComponent(input)));
    return `ie-${encodeURIComponent(base64)}`;
  }
};

const formatPosition = (value: number | string): string => {
  if (typeof value === "number" && value < 0) {
    return `N${Math.abs(value)}`;
  }
  return String(value);
};

const formatColor = (color: string): string => {
  return color.replace("#", "");
};

// Main function matching your original signature
export function videoOverlaysToParams(overlays: VideoOverlay[]): string[] {
  const parts: string[] = [];

  overlays.forEach(o => {
    switch (o.type) {
      case "text": {
        const params: string[] = ["l-text", encodeInput(o.text)];

        if (isSet(o.fontSize)) params.push(`fs-${o.fontSize}`);
        if (isSet(o.fontFamily)) params.push(`ff-${o.fontFamily}`);
        if (isSet(o.color)) params.push(`co-${formatColor(o.color)}`);
        if (isSet(o.backgroundColor))
          params.push(`bg-${formatColor(o.backgroundColor)}`);
        if (isSet(o.bg)) params.push(`bg-${formatColor(o.bg)}`);
        if (isSet(o.align)) params.push(`ia-${o.align}`);
        if (isSet(o.padding)) params.push(`pa-${o.padding}`);
        if (isSet(o.lineHeight)) params.push(`lh-${o.lineHeight}`);
        if (isSet(o.radius)) params.push(`r-${o.radius}`);
        if (isSet(o.rotation)) params.push(`rt-${o.rotation}`);

        if (o.typography && o.typography.length > 0) {
          params.push(`tg-${o.typography.join("_")}`);
        } else {
          const typoFlags: string[] = [];
          if (o.bold === "true") typoFlags.push("b");
          if (o.italic === "true") typoFlags.push("i");
          if (o.strike === "true") typoFlags.push("strikethrough");
          if (typoFlags.length > 0) {
            params.push(`tg-${typoFlags.join("_")}`);
          }
        }

        if (isSet(o.opacity)) params.push(`al-${o.opacity}`);
        if (o.flip) params.push("fl-h");

        // Position
        if (isSet(o.x)) params.push(`lx-${formatPosition(o.x!)}`);
        if (isSet(o.y)) params.push(`ly-${formatPosition(o.y!)}`);
        if (isSet(o.focus)) params.push(`lfo-${o.focus}`);

        // Timing
        if (isSet(o.startOffset)) params.push(`lso-${o.startOffset}`);
        if (isSet(o.endOffset)) params.push(`leo-${o.endOffset}`);
        if (isSet(o.duration)) params.push(`ldu-${o.duration}`);

        params.push("l-end");
        parts.push(params.join(","));
        break;
      }

      case "image": {
        const params: string[] = ["l-image", encodeInput(o.src)];

        if (isSet(o.width)) params.push(`w-${o.width}`);
        if (isSet(o.height)) params.push(`h-${o.height}`);
        if (isSet(o.aspectRatio)) params.push(`ar-${o.aspectRatio}`);

        if (isSet(o.cropMode)) {
          if (o.cropMode === "extract" || o.cropMode === "pad_resize") {
            params.push(`cm-${o.cropMode}`);
          } else {
            params.push(`c-${o.cropMode}`);
          }
        }

        if (isSet(o.border)) params.push(`b-${o.border}`);
        if (isSet(o.bg)) params.push(`bg-${formatColor(o.bg)}`);
        if (isSet(o.radius)) params.push(`r-${o.radius}`);
        if (isSet(o.rotation)) params.push(`rt-${o.rotation}`);
        if (isSet(o.opacity)) params.push(`al-${o.opacity}`);

        // Position
        if (isSet(o.x)) params.push(`lx-${formatPosition(o.x!)}`);
        if (isSet(o.y)) params.push(`ly-${formatPosition(o.y!)}`);
        if (isSet(o.focus)) params.push(`lfo-${o.focus}`);

        // Timing
        if (isSet(o.startOffset)) params.push(`lso-${o.startOffset}`);
        if (isSet(o.endOffset)) params.push(`leo-${o.endOffset}`);
        if (isSet(o.duration)) params.push(`ldu-${o.duration}`);

        params.push("l-end");
        parts.push(params.join(","));
        break;
      }

      case "solid": {
        const params: string[] = ["l-image", "i-ik_canvas"];

        if (isSet(o.color)) params.push(`bg-${formatColor(o.color)}`);
        if (isSet(o.width)) params.push(`w-${o.width}`);
        if (isSet(o.height)) params.push(`h-${o.height}`);
        if (isSet(o.opacity)) params.push(`al-${o.opacity}`);
        if (isSet(o.radius)) params.push(`r-${o.radius}`);

        // Position
        if (isSet(o.x)) params.push(`lx-${formatPosition(o.x!)}`);
        if (isSet(o.y)) params.push(`ly-${formatPosition(o.y!)}`);
        if (isSet(o.focus)) params.push(`lfo-${o.focus}`);

        // Timing
        if (isSet(o.startOffset)) params.push(`lso-${o.startOffset}`);
        if (isSet(o.endOffset)) params.push(`leo-${o.endOffset}`);
        if (isSet(o.duration)) params.push(`ldu-${o.duration}`);

        params.push("l-end");
        parts.push(params.join(","));
        break;
      }

      case "video": {
        const params: string[] = ["l-video", encodeInput(o.src)];

        if (isSet(o.width)) params.push(`w-${o.width}`);
        if (isSet(o.height)) params.push(`h-${o.height}`);
        if (isSet(o.opacity)) params.push(`al-${o.opacity}`);

        // Position
        if (isSet(o.x)) params.push(`lx-${formatPosition(o.x!)}`);
        if (isSet(o.y)) params.push(`ly-${formatPosition(o.y!)}`);
        if (isSet(o.focus)) params.push(`lfo-${o.focus}`);

        // Timing
        if (isSet(o.startOffset)) params.push(`lso-${o.startOffset}`);
        if (isSet(o.endOffset)) params.push(`leo-${o.endOffset}`);
        if (isSet(o.duration)) params.push(`ldu-${o.duration}`);

        params.push("l-end");
        parts.push(params.join(","));
        break;
      }
    }
  });

  return parts;
}

/* ---------------- ENHANCEMENTS ---------------- */
function enhancementsToParams(enh: Enhancements): string[] {
  const parts: string[] = [];

  if (enh.blur !== undefined) parts.push(`bl-${enh.blur}`);
  if (enh.sharpen !== undefined) parts.push("e-sharpen");
  if (enh.brightness !== undefined) parts.push(`e-bright:${enh.brightness}`);
  if (enh.contrast !== undefined) parts.push(`e-contrast:${enh.contrast}`);
  if (enh.saturation !== undefined)
    parts.push(`e-saturation:${enh.saturation}`);
  if (enh.noise !== undefined) parts.push(`e-noise:${enh.noise}`);

  if (enh.shadow) {
    const s = enh.shadow;
    const shadowParts: string[] = ["e-shadow"];
    if (s.blur !== undefined) shadowParts.push(`bl-${s.blur}`);
    if (s.saturation !== undefined) shadowParts.push(`st-${s.saturation}`);
    if (s.offsetX !== undefined) shadowParts.push(`x-${s.offsetX}`);
    if (s.offsetY !== undefined) shadowParts.push(`y-${s.offsetY}`);
    parts.push(shadowParts.join("_"));
  }

  if (enh.background) {
    const bg = enh.background;
    if (bg.type === "solid" && bg.color) parts.push(`bg-${bg.color}`);
    if (bg.type === "blurred") {
      const val = ["bg-blurred"];
      if (bg.blurIntensity !== undefined) val.push(`${bg.blurIntensity}`);
      if (bg.brightness !== undefined) val.push(`${bg.brightness}`);
      parts.push(val.join("_"));
    }
    if (bg.type === "dominant") parts.push("bg-dominant");
  }

  return parts;
}

function videoEnhancementsToParams(enh: VideoEnhancements): string[] {
  const parts: string[] = [];
  if (enh.trimming) {
    const t = enh.trimming;
    if (t.startOffset !== undefined) parts.push(`so-${t.startOffset}`);
    if (t.endOffset !== undefined) parts.push(`eo-${t.endOffset}`);
    if (t.duration !== undefined) parts.push(`du-${t.duration}`);
  }
  if (enh.thumbnail) {
    const th = enh.thumbnail;
    if (th.time !== undefined) parts.push(`so-${th.time}`);
    if (th.width) parts.push(`w-${th.width}`);
    if (th.height) parts.push(`h-${th.height}`);
    if (th.aspectRatio) parts.push(`ar-${th.aspectRatio}`);
    if (th.cropMode) {
      parts.push(`cm-${th.cropMode}`);
    }
    if (th.focus) parts.push(`fo-${th.focus}`);
    if (th.border) parts.push(`b-${th.border.width}_${th.border.color}`);
    if (th.bg) parts.push(`bg-${th.bg}`);
    if (th.radius !== undefined) parts.push(`r-${th.radius}`);
  }
  return parts;
}

/* ---------------- AI MAGIC ---------------- */
function aiToParams(ai: AiMagic): string[] {
  const parts: string[] = [];
  if (ai.background) {
    const bg = ai.background;
    if (bg.remove) {
      parts.push(bg.mode === "economy" ? "e-bgremove" : "e-removedotbg");
    }
    if (bg.changePrompt) {
      parts.push(`e-changebg-prompt-${bg.changePrompt}`);
    }
    if (bg.generativeFill) {
      const g = bg.generativeFill;
      let val = "bg-genfill";
      if (g.prompt) val += `-prompt-${g.prompt}`;
      parts.push(val);
      if (g.width) parts.push(`w-${g.width}`);
      if (g.height) parts.push(`h-${g.height}`);
      if (g.cropMode) parts.push(`cm-${g.cropMode}`);
    }
  }

  if (ai.editing) {
    const e = ai.editing;
    if (e.prompt) parts.push(`e-edit-prompt-${e.prompt}`);
    if (e.retouch) parts.push("e-retouch");
    if (e.upscale) parts.push("e-upscale");
  }

  if (ai.shadowLighting?.dropShadow) {
    const s = ai.shadowLighting.dropShadow;
    let val = "e-dropshadow";
    if (s.azimuth !== undefined) val += `-az-${s.azimuth}`;
    if (s.elevation !== undefined) val += `-el-${s.elevation}`;
    if (s.saturation !== undefined) val += `-st-${s.saturation}`;
    parts.push(val);
  }

  if (ai.generation) {
    const g = ai.generation;
    if (g.textPrompt) {
      parts.push(`ik-genimg-prompt-${g.textPrompt}`);
    }
    if (g.variation) parts.push("e-genvar");
  }

  if (ai.cropping) {
    const c = ai.cropping;
    if (c.type === "smart") parts.push("fo-auto");
    if (c.type === "face") parts.push("fo-face");
    if (c.type === "object" && c.objectName) parts.push(`fo-${c.objectName}`);
    if (c.zoom !== undefined) parts.push(`z-${c.zoom}`);
    if (c.width) parts.push(`w-${c.width}`);
    if (c.height) parts.push(`h-${c.height}`);
  }
  return parts;
}

/* ---------------- AUDIO ---------------- */
function audioToParams(a: VideoAudio): string[] {
  const p: string[] = [];
  if (a.mute) p.push("ac-none");
  if (a.extractAudio) p.push("vc-none");
  return p;
}

/* ---------------- MASTER BUILDER ---------------- */
export function buildTrString(config: TransformationConfig): string {
  const parts: string[] = [];

  if (config.type === "IMAGE") {
    if (config.basics) parts.push(...basicsToParams(config.basics));
    if (config.enhancements)
      parts.push(...enhancementsToParams(config.enhancements));
    if (config.ai) parts.push(...aiToParams(config.ai));
    if (config.overlays) parts.push(...overlaysToParams(config.overlays));
  }
  if (config.type === "VIDEO") {
    if (config.basics) parts.push(...videoBasicsToParams(config.basics));
    if (config.enhancements)
      parts.push(...videoEnhancementsToParams(config.enhancements));
    if (config.overlays) parts.push(...videoOverlaysToParams(config.overlays));
    if (config.audio) parts.push(...audioToParams(config.audio));
  }
  return parts.filter(Boolean).join(":");
}

export function buildImageKitUrl(
  src: string,
  config: TransformationConfig
): string {
  const tr = buildTrString(config);
  if (!tr) return src;

  try {
    const url = new URL(src);
    const base = url.origin + url.pathname;
    const search = url.search
      ? `${url.search.replace(/^\?/, "")}&tr=${tr}`
      : `tr=${tr}`;

    return `${base}?${search}`;
  } catch {
    return src.includes("?") ? `${src}&tr=${tr}` : `${src}?tr=${tr}`;
  }
}
