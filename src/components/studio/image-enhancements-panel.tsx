import {
  Contrast,
  Droplet,
  Palette,
  PenSquare,
  Star,
  Sun,
  Waves,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";

type Shadow = {
  blur?: number;
  saturation?: number;
  offsetX?: number;
  offsetY?: number;
};

type Background = {
  type: "solid" | "blurred" | "dominant";
  color?: string;
  blurIntensity?: number;
  brightness?: number;
};

type Enhancements = {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
  sharpen?: number;
  noise?: number;
  shadow?: Shadow;
  background?: Background;
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

  const updateShadow = (patch: Partial<Shadow>) => {
    update({shadow: {...(enhancements.shadow || {}), ...patch}});
  };

  const updateBackground = (patch: Partial<Background>) => {
    update({
      background: {...(enhancements.background || {type: "solid"}), ...patch},
    });
  };

  const resetEnhancements = () => {
    onEnhancementsChange({});
  };

  return (
    <div className="h-full flex flex-col space-y-2 md:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300">
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

        {/* NOISE REDUCTION */}
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

        {/* SHADOW */}
        <AccordionItem value="shadow">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Waves className="size-4" /> Shadow
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5 space-y-4">
            <div>
              <label className="text-sm font-medium">Blur</label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[enhancements.shadow?.blur ?? 0]}
                onValueChange={([value]) => updateShadow({blur: value})}
              />
              <div className="text-xs text-muted-foreground">
                {enhancements.shadow?.blur ?? 0}px
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Saturation</label>
              <Slider
                min={0}
                max={200}
                step={1}
                value={[enhancements.shadow?.saturation ?? 100]}
                onValueChange={([value]) => updateShadow({saturation: value})}
              />
              <div className="text-xs text-muted-foreground">
                {enhancements.shadow?.saturation ?? 100}%
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Offset X</label>
              <Slider
                min={-100}
                max={100}
                step={1}
                value={[enhancements.shadow?.offsetX ?? 0]}
                onValueChange={([value]) => updateShadow({offsetX: value})}
              />
              <div className="text-xs text-muted-foreground">
                {enhancements.shadow?.offsetX ?? 0}px
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Offset Y</label>
              <Slider
                min={-100}
                max={100}
                step={1}
                value={[enhancements.shadow?.offsetY ?? 0]}
                onValueChange={([value]) => updateShadow({offsetY: value})}
              />
              <div className="text-xs text-muted-foreground">
                {enhancements.shadow?.offsetY ?? 0}px
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* BACKGROUND */}
        <AccordionItem value="background">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Palette className="size-4" /> Background
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5 space-y-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <div className="flex gap-2 mt-2">
                {["solid", "blurred", "dominant"].map(type => (
                  <Button
                    key={type}
                    variant={
                      enhancements.background?.type === type
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateBackground({
                        type: type as "solid" | "blurred" | "dominant",
                      })
                    }
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {enhancements.background?.type === "solid" && (
              <div>
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={enhancements.background?.color ?? "#000000"}
                    onChange={e => updateBackground({color: e.target.value})}
                    className="h-10 w-20 cursor-pointer rounded border"
                  />
                  <input
                    type="text"
                    value={enhancements.background?.color ?? "#000000"}
                    onChange={e => updateBackground({color: e.target.value})}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                    placeholder="#000000"
                  />
                </div>
              </div>
            )}

            {enhancements.background?.type === "blurred" && (
              <>
                <div>
                  <label className="text-sm font-medium">Blur Intensity</label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[enhancements.background?.blurIntensity ?? 0]}
                    onValueChange={([value]) =>
                      updateBackground({blurIntensity: value})
                    }
                  />
                  <div className="text-xs text-muted-foreground">
                    {enhancements.background?.blurIntensity ?? 0}%
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Brightness</label>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    value={[enhancements.background?.brightness ?? 100]}
                    onValueChange={([value]) =>
                      updateBackground({brightness: value})
                    }
                  />
                  <div className="text-xs text-muted-foreground">
                    {enhancements.background?.brightness ?? 100}%
                  </div>
                </div>
              </>
            )}
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
