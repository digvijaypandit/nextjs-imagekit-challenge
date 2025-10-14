import {Contrast, Droplet, PenSquare, Star, Sun} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";

type Enhancements = {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
  sharpen?: number;
  noise?: number;
};

type EnhancementsControlsProps = {
  enhancements: Enhancements;
  onEnhancementsChange: (enhancements: Enhancements) => void;
};

export function ImageEnhancementsPanel({
  enhancements,
  onEnhancementsChange,
}: EnhancementsControlsProps) {
  const update = (patch: Partial<Enhancements>) => {
    onEnhancementsChange({...enhancements, ...patch});
  };

  const resetEnhancements = () => {
    onEnhancementsChange({});
  };

  return (
    <div className="h-full flex flex-col space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* BRIGHTNESS */}
        <AccordionItem value="brightness">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Sun className="size-4" /> Brightness
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Slider
              min={0}
              max={200}
              step={1}
              value={[enhancements.brightness ?? 100]}
              onValueChange={([value]) => update({brightness: value})}
            />
            <div className="text-xs text-muted-foreground">
              {enhancements.brightness ?? 100}%
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* CONTRAST */}
        <AccordionItem value="contrast">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Contrast className="size-4" /> Contrast
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Slider
              min={0}
              max={200}
              step={1}
              value={[enhancements.contrast ?? 100]}
              onValueChange={([value]) => update({contrast: value})}
            />
            <div className="text-xs text-muted-foreground">
              {enhancements.contrast ?? 100}%
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SATURATION */}
        <AccordionItem value="saturation">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Droplet className="size-4" /> Saturation
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Slider
              min={0}
              max={200}
              step={1}
              value={[enhancements.saturation ?? 100]}
              onValueChange={([value]) => update({saturation: value})}
            />
            <div className="text-xs text-muted-foreground">
              {enhancements.saturation ?? 100}%
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* BLUR */}
        <AccordionItem value="blur">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <PenSquare className="size-4" /> Blur
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[enhancements.blur ?? 0]}
              onValueChange={([value]) => update({blur: value})}
            />
            <div className="text-xs text-muted-foreground">
              {enhancements.blur ?? 0}px
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SHARPEN */}
        <AccordionItem value="sharpen">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Star className="size-4" /> Sharpen
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[enhancements.sharpen ?? 0]}
              onValueChange={([value]) => update({sharpen: value})}
            />
            <div className="text-xs text-muted-foreground">
              {enhancements.sharpen ?? 0}%
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* NOISE */}
        <AccordionItem value="noise">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Droplet className="size-4" /> Noise Reduction
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[enhancements.noise ?? 0]}
              onValueChange={([value]) => update({noise: value})}
            />
            <div className="text-xs text-muted-foreground">
              {enhancements.noise ?? 0}%
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={resetEnhancements}
        >
          Reset Enhancements
        </Button>
      </div>
    </div>
  );
}
