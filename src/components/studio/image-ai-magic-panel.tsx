import {Image, RefreshCcw, WandSparklesIcon, Zap} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";
import {AiMagic} from "@/types/image-transformations";

type AIMagicPanelProps = {
  aiMagic: AiMagic;
  onAIMagicChange: (magic: AiMagic) => void;
};

const styleOptions = [
  {label: "None", value: "none"},
  {label: "Cartoon", value: "cartoon"},
  {label: "Oil Painting", value: "oil_painting"},
  {label: "Watercolor", value: "watercolor"},
  {label: "Sketch", value: "sketch"},
];

export function AIMagicPanel({aiMagic, onAIMagicChange}: AIMagicPanelProps) {
  const update = (patch: Partial<AiMagic>) => {
    onAIMagicChange({...aiMagic, ...patch});
  };

  const resetAIMagic = () => {
    onAIMagicChange({});
  };

  return (
    <div className="h-full flex flex-col space-y-2 md:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Background Removal */}
        <AccordionItem value="background-removal">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <WandSparklesIcon className="size-4" /> Background Removal
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Button
              variant={aiMagic.background?.remove ? "default" : "outline"}
              className="w-full"
              onClick={() =>
                update({
                  background: {
                    ...aiMagic.background,
                    remove: !aiMagic.background?.remove,
                    mode: "standard",
                  },
                })
              }
            >
              {aiMagic.background?.remove ? "Enabled" : "Enable"}
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Colorize (as generative fill) */}
        <AccordionItem value="colorize">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Zap className="size-4" /> Colorize
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5">
            <Button
              variant={aiMagic.generation?.textPrompt ? "default" : "outline"}
              className="w-full"
              onClick={() =>
                update({
                  generation: {
                    ...aiMagic.generation,
                    textPrompt: aiMagic.generation?.textPrompt
                      ? undefined
                      : "Colorize image",
                  },
                })
              }
            >
              {aiMagic.generation?.textPrompt ? "Enabled" : "Enable"}
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Style Transfer */}
        <AccordionItem value="style-transfer">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Image className="size-4" /> Style Transfer
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5 space-y-2">
            <Label>Choose Style</Label>
            <Select
              value={aiMagic.editing?.prompt || "none"}
              onValueChange={value =>
                update({
                  editing: {
                    ...aiMagic.editing,
                    prompt: value === "none" ? undefined : value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Upscale */}
        <AccordionItem value="upscale">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <RefreshCcw className="size-4" /> Upscale
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0.5 space-y-2">
            <Label>Upscale Factor ({aiMagic.editing?.upscale ? 2 : 1}x)</Label>
            <Slider
              min={1}
              max={2}
              step={1}
              value={[aiMagic.editing?.upscale ? 2 : 1]}
              onValueChange={([value]) =>
                update({
                  editing: {
                    ...aiMagic.editing,
                    upscale: value === 1 ? undefined : true,
                  },
                })
              }
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={resetAIMagic}>
          Reset AI Magic
        </Button>
      </div>
    </div>
  );
}
