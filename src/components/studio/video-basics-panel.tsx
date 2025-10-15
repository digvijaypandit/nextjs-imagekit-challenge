"use client";

import {Crop, Image as ImageIcon, RotateCw} from "lucide-react";

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
  FocusMode,
  BasicsTransform as VideoBasics,
} from "@/types/video-transformations";

type VideoBasicsPanelProps = {
  transforms?: VideoBasics;
  onTransformChange: (t: VideoBasics) => void;
};

const aspectRatios = [
  {label: "Custom", value: "custom"},
  {label: "16:9 (Wide)", value: "16-9"},
  {label: "9:16 (Portrait)", value: "9-16"},
  {label: "1:1 (Square)", value: "1-1"},
  {label: "4:3", value: "4-3"},
  {label: "21:9", value: "21-9"},
];

const cropModes = [
  {label: "Maintain Ratio", value: "maintain_ratio"},
  {label: "Pad & Resize", value: "pad_resize"},
  {label: "Force", value: "force"},
  {label: "Extract", value: "extract"},
];

const focusModes = [
  {label: "Center", value: "center"},
  {label: "Top", value: "top"},
  {label: "Bottom", value: "bottom"},
  {label: "Left", value: "left"},
  {label: "Right", value: "right"},
  {label: "Face", value: "face"},
  {label: "Auto", value: "auto"},
];

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";
const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";
const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function VideoBasicsPanel({
  transforms = {}, // default empty object
  onTransformChange,
}: VideoBasicsPanelProps) {
  const update = (patch: Partial<VideoBasics>) =>
    onTransformChange({...transforms, ...patch});

  const resetAll = () => {
    onTransformChange({});
  };

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Resize & Crop */}
        <AccordionItem value="resize-crop">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Crop className="size-4" />
              Resize & Crop
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Width</Label>
                <Input
                  type="number"
                  placeholder="Auto"
                  value={transforms.width ?? ""}
                  onChange={e =>
                    update({
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
                  value={transforms.height ?? ""}
                  onChange={e =>
                    update({
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
              <Label className="text-xs font-medium">Aspect Ratio</Label>
              <Select
                value={transforms.aspectRatio ?? "custom"}
                onValueChange={v =>
                  update({aspectRatio: v === "custom" ? undefined : v})
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map(a => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Crop Mode</Label>
              <Select
                value={transforms.cropMode ?? "maintain_ratio"}
                onValueChange={v =>
                  update({
                    cropMode:
                      v === "maintain_ratio" ? undefined : (v as CropMode),
                  })
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cropModes.map(m => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Focus */}
        <AccordionItem value="focus">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4" />
              Focus
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <Label className="text-xs font-medium">Focus Mode</Label>
            <Select
              value={transforms.focus ?? "center"}
              onValueChange={v =>
                update({focus: v === "center" ? undefined : (v as FocusMode)})
              }
            >
              <SelectTrigger className={inputStyles} style={gradientBg}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {focusModes.map(f => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Rotate */}
        <AccordionItem value="rotate">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <RotateCw className="size-4" />
              Rotation & Radius
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Rotate (°)</Label>
              <Slider
                min={0}
                max={360}
                step={90}
                value={[transforms.rotate ?? 0]}
                onValueChange={([val]) =>
                  update({
                    rotate:
                      val === 0 ? undefined : (val as 0 | 90 | 180 | 270 | 360),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Radius</Label>
              <Input
                type="number"
                placeholder="px"
                value={transforms.radius ?? ""}
                onChange={e =>
                  update({
                    radius: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
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
