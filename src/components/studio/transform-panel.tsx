import {type SectionKey} from "@/components/studio/dock";
import {TransformationConfig} from "@/types";
import type {
  Enhancements as ImageEnhancements,
  TextOverlay as ImageTextOverlay,
  TextOverlay,
} from "@/types/image-transformations";
import {AiMagic} from "@/types/image-transformations";
import type {
  Enhancements as VideoEnhancements,
  TextOverlay as VideoTextOverlay,
} from "@/types/video-transformations";

import {AIMagicPanel} from "./image-ai-magic-panel";
import {ImageBasicsPanel} from "./image-basics-panel";
import {ImageEnhancementsPanel} from "./image-enhancements-panel";
import {ImageOverlayPanel} from "./image-overlay-panel";
import {VideoAudioPanel} from "./video-audio-panel";
import {VideoBasicsPanel} from "./video-basics-panel";
import {VideoEnhancementsPanel} from "./video-enhancements-panel";
import {VideoOverlayPanel} from "./video-overlay-panel";

type TransformPanelProps = {
  activeSection: SectionKey;
  transforms: TransformationConfig;
  onTransformChange: (transforms: TransformationConfig) => void;
};

// Default TextOverlay for fallback
const defaultTextOverlay: TextOverlay = {
  type: "text",
  text: "",
  fontSize: 16,
  fontFamily: "Arial",
  color: "#000000",
  backgroundColor: "#ffffff",
  align: "center",
  padding: "0",
  rotation: 0,
  flip: "h",
  bold: "",
  italic: "",
  strike: "",
};

const defaultImageTextOverlay: ImageTextOverlay = {
  type: "text",
  text: "",
  fontSize: 16,
  fontFamily: "Arial",
  color: "#000000",
  backgroundColor: "#ffffff",
  align: "center",
  padding: "0",
  rotation: 0,
  flip: "h",
  bold: "",
  italic: "",
  strike: "",
};

// Default for videos
const defaultVideoTextOverlay: VideoTextOverlay = {
  type: "text",
  text: "",
  fontSize: 16,
  fontFamily: "Arial",
  color: "#000000",
  backgroundColor: "#ffffff",
  align: "center",
  rotation: 0,
  flip: false,
  bold: "",
  italic: "",
  strike: "",
  opacity: 1,
  bg: "#ffffff",
};

// Default Enhancements fallback
export const defaultImageEnhancements: ImageEnhancements = {
  blur: 0,
  sharpen: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  noise: 0,
  shadow: {},
  background: {
    type: "solid",
    color: "#ffffff",
    blurIntensity: 0,
    brightness: 100,
  },
};

export const defaultVideoEnhancements: VideoEnhancements = {
  thumbnail: {
    width: 1920,
    height: 1080,
    aspectRatio: "16-9",
    cropMode: "maintain_ratio",
    focus: "center",
    border: {width: 0, color: "#000000"},
    bg: "#000000",
    radius: 0,
  },
  trimming: {
    startOffset: 0,
    endOffset: 10,
    duration: 10,
  },
};

export function TransformPanel({
  activeSection,
  transforms,
  onTransformChange,
}: TransformPanelProps) {
  const getSectionTitle = (section: SectionKey) => {
    switch (section) {
      case "basics":
        return "Basic Adjustments";
      case "overlays":
        return "Overlays & Effects";
      case "enhancements":
        return "Enhancements";
      case "ai":
        return "AI Magic";
      case "audio":
        return "Audio";
      default:
        return "Transform";
    }
  };

  const renderPanelContent = () => {
    switch (activeSection) {
      case "basics":
        if (transforms.type === "IMAGE") {
          return (
            <ImageBasicsPanel
              transforms={transforms.basics || {}}
              onTransformChange={b =>
                onTransformChange({...transforms, basics: b})
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoBasicsPanel
              transforms={transforms.basics || {}}
              onTransformChange={b =>
                onTransformChange({...transforms, basics: b})
              }
            />
          );
        }
        break;

      case "overlays":
        if (transforms.type === "IMAGE") {
          return (
            <ImageOverlayPanel
              overlay={transforms.overlays?.[0] ?? defaultImageTextOverlay}
              onOverlayChange={updatedOverlay => {
                const updatedOverlays = [updatedOverlay];
                onTransformChange({...transforms, overlays: updatedOverlays});
              }}
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoOverlayPanel
              overlay={transforms.overlays?.[0] ?? defaultVideoTextOverlay}
              onOverlayChange={updatedOverlay => {
                const updatedOverlays = [updatedOverlay];
                onTransformChange({...transforms, overlays: updatedOverlays});
              }}
            />
          );
        }
        break;

      case "enhancements":
        if (transforms.type === "IMAGE") {
          return (
            <ImageEnhancementsPanel
              enhancements={transforms.enhancements || defaultImageEnhancements}
              onEnhancementsChange={e =>
                onTransformChange({...transforms, enhancements: e})
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoEnhancementsPanel
              enhancements={transforms.enhancements || defaultVideoEnhancements}
              onEnhancementsChange={e =>
                onTransformChange({...transforms, enhancements: e})
              }
            />
          );
        }
        break;

      case "ai":
        if (transforms.type === "IMAGE") {
          return (
            <AIMagicPanel
              aiMagic={transforms.ai || ({} as AiMagic)}
              onAIMagicChange={a => onTransformChange({...transforms, ai: a})}
            />
          );
        } else {
          return (
            <div className="p-4 text-center text-gray-500 text-sm">
              AI Magic is only available for images.
            </div>
          );
        }

      case "audio":
        if (transforms.type === "VIDEO") {
          return (
            <VideoAudioPanel
              audio={transforms.audio || {}}
              onAudioChange={a => onTransformChange({...transforms, audio: a})}
            />
          );
        } else {
          return (
            <div className="p-4 text-center text-gray-500 text-sm">
              Audio settings are available for video files only.
            </div>
          );
        }

      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Select a section to get started
          </div>
        );
    }
  };

  return (
    <div className="border flex flex-col border-pink-300/30 dark:border-pink-200/15 max-md:min-h-32 md:w-1/4 rounded-xl p-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-300/30 dark:border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 text-xs text-foreground/60">
            {getSectionTitle(activeSection)}
          </h3>
        </div>
      </div>
      <div className="max-h-full">{renderPanelContent()}</div>
    </div>
  );
}
