"use client";

import {ImageIcon, Scissors} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";
import {
  CropMode,
  Enhancements,
  Thumbnail,
  Trimming,
} from "@/types/video-transformations";

type VideoEnhancementsPanelProps = {
  enhancements: Enhancements;
  onEnhancementsChange: (e: Enhancements) => void;
};

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";
const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";
const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};
export function VideoEnhancementsPanel({
  enhancements,
  onEnhancementsChange,
}: VideoEnhancementsPanelProps) {
  const update = (patch: Partial<Enhancements>) =>
    onEnhancementsChange({...enhancements, ...patch});

  const updateTrimming = (patch: Partial<Trimming>) => {
    // When updating trimming, make sure to remove thumbnail time to avoid conflicts
    const newEnhancements = {
      ...enhancements,
      thumbnail: {...(enhancements.thumbnail || {}), time: undefined},
      trimming: {...(enhancements.trimming || {}), ...patch},
    };
    onEnhancementsChange(newEnhancements);
  };

  const updateThumbnail = (patch: Partial<Thumbnail>) => {
    // When updating thumbnail time, make sure to remove trimming start offset
    const newEnhancements = {
      ...enhancements,
      trimming: {...(enhancements.trimming || {}), startOffset: undefined},
      thumbnail: {...(enhancements.thumbnail || {}), ...patch},
    };
    onEnhancementsChange(newEnhancements);
  };

  const resetAll = () =>
    onEnhancementsChange({trimming: undefined, thumbnail: undefined});

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Trimming Section */}
        <AccordionItem value="trimming">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Scissors className="size-4" />
              Trimming
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Start (s)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.trimming?.startOffset || ""}
                  onChange={e =>
                    updateTrimming({
                      startOffset: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">End (s)</Label>
                <Input
                  type="number"
                  placeholder="End"
                  value={enhancements.trimming?.endOffset || ""}
                  onChange={e =>
                    updateTrimming({
                      endOffset: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Duration (s)</Label>
                <Input
                  type="number"
                  placeholder="Auto"
                  value={enhancements.trimming?.duration || ""}
                  onChange={e =>
                    updateTrimming({
                      duration: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Trim preview</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[
                  enhancements.trimming?.startOffset
                    ? Math.min(Number(enhancements.trimming.startOffset), 100)
                    : 0,
                ]}
                onValueChange={([val]) => updateTrimming({startOffset: val})}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Thumbnail Extraction Section */}
        <AccordionItem value="thumbnail">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4" />
              Thumbnail
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Time (s)</Label>
              <Input
                type="number"
                placeholder="Auto"
                value={enhancements.thumbnail?.time || ""}
                onChange={e =>
                  updateThumbnail({
                    time: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Width</Label>
                <Input
                  type="number"
                  placeholder="Auto"
                  value={enhancements.thumbnail?.width || ""}
                  onChange={e =>
                    updateThumbnail({
                      width: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Height</Label>
                <Input
                  type="number"
                  placeholder="Auto"
                  value={enhancements.thumbnail?.height || ""}
                  onChange={e =>
                    updateThumbnail({
                      height: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Crop Mode</Label>
              <Select
                value={enhancements.thumbnail?.cropMode || "maintain_ratio"}
                onValueChange={(v: CropMode) =>
                  updateThumbnail({
                    cropMode: v === "maintain_ratio" ? undefined : v,
                  })
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintain_ratio">Maintain Ratio</SelectItem>
                  <SelectItem value="force">Force</SelectItem>
                  <SelectItem value="pad_resize">Pad & Resize</SelectItem>
                  <SelectItem value="at_max">At Max</SelectItem>
                  <SelectItem value="at_least">At Least</SelectItem>
                  <SelectItem value="extract">Extract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 pb-12 px-0.5">
        <Button
          variant="outline"
          onClick={resetAll}
          className={`w-full ${buttonStyles}`}
          style={gradientBg}
        >
          Reset All
        </Button>
      </div>
    </div>
  );
}
