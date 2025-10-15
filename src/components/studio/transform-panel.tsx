import {type SectionKey} from "@/components/studio/dock";
import {
  type BasicsTransform as ImageBasicsType,
  type Enhancements as ImageEnhancementsType,
  type Overlay as ImageOverlayType,
} from "@/types/image-transformations";
import {
  type AiMagic,
  type Audio,
  type TransformationConfig,
  type Overlay as UnifiedOverlay,
  type TextOverlay as UnifiedTextOverlay,
} from "@/types/transformations";
import {
  type BasicsTransform as VideoBasicsType,
  type Enhancements as VideoEnhancementsType,
  type Overlay as VideoOverlayType,
} from "@/types/video-transformations";

import {AIMagicPanel} from "./image-ai-magic-panel";
import {ImageBasicsPanel} from "./image-basics-panel";
import {ImageEnhancementsPanel} from "./image-enhancements-panel";
import {ImageOverlayPanel} from "./image-overlay-panel";
import {VideoAudioPanel} from "./video-audio-panel";
import {VideoBasicsPanel} from "./video-basics-panel";
import {VideoEnhancementsPanel} from "./video-enhancements-panel";
import {VideoOverlayPanel} from "./video-overlay-panel";

function defaultTextOverlay(
  overrides?: Partial<UnifiedTextOverlay>
): UnifiedTextOverlay {
  return {
    type: "text",
    text: "",
    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
    backgroundColor: "transparent",
    align: "left",
    typography: [],
    padding: "0",
    bg: "transparent",
    radius: 0,
    rotation: 0,
    lineHeight: 1.2,
    opacity: 1,
    bold: "normal",
    italic: "normal",
    strike: "none",
    flip: false,
    ...overrides,
  };
}

type TransformPanelProps = {
  activeSection: SectionKey;
  transforms: TransformationConfig;
  onTransformChange: (transforms: TransformationConfig) => void;
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
              transforms={(transforms.basics as ImageBasicsType) ?? {}}
              onTransformChange={(updatedBasics: ImageBasicsType) =>
                onTransformChange({...transforms, basics: updatedBasics})
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoBasicsPanel
              transforms={(transforms.basics as VideoBasicsType) ?? {}}
              onTransformChange={(updatedBasics: VideoBasicsType) =>
                onTransformChange({...transforms, basics: updatedBasics})
              }
            />
          );
        }
        break;

      case "overlays":
        const overlay =
          (transforms.overlays?.[0] as UnifiedTextOverlay) ??
          defaultTextOverlay();
        if (transforms.type === "IMAGE") {
          return (
            <ImageOverlayPanel
              overlay={overlay as ImageOverlayType}
              onOverlayChange={(updatedOverlay: ImageOverlayType) =>
                onTransformChange({
                  ...transforms,
                  overlays: [updatedOverlay as UnifiedOverlay],
                })
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoOverlayPanel
              overlay={overlay as VideoOverlayType}
              onOverlayChange={(updatedOverlay: VideoOverlayType) =>
                onTransformChange({
                  ...transforms,
                  overlays: [updatedOverlay as UnifiedOverlay],
                })
              }
            />
          );
        }
        break;

      case "enhancements":
        if (transforms.type === "IMAGE") {
          return (
            <ImageEnhancementsPanel
              enhancements={
                (transforms.enhancements as ImageEnhancementsType) ?? {}
              }
              onEnhancementsChange={(
                updatedEnhancements: ImageEnhancementsType
              ) =>
                onTransformChange({
                  ...transforms,
                  enhancements: updatedEnhancements,
                })
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoEnhancementsPanel
              enhancements={
                (transforms.enhancements as VideoEnhancementsType) ?? {}
              }
              onEnhancementsChange={(
                updatedEnhancements: VideoEnhancementsType
              ) =>
                onTransformChange({
                  ...transforms,
                  enhancements: updatedEnhancements,
                })
              }
            />
          );
        }
        break;

      case "ai":
        return (
          <AIMagicPanel
            aiMagic={transforms.ai ?? {}}
            onAIMagicChange={(updatedAiMagic: AiMagic) =>
              onTransformChange({...transforms, ai: updatedAiMagic})
            }
          />
        );

      case "audio":
        if (transforms.type === "VIDEO") {
          return (
            <VideoAudioPanel
              audio={transforms.audio ?? {}}
              onAudioChange={(updatedAudio: Audio) =>
                onTransformChange({...transforms, audio: updatedAudio})
              }
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
