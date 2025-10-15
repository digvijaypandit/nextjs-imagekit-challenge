"use client";

import {Music2, Volume2, VolumeX} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Audio as VideoAudio} from "@/types/video-transformations";

type VideoAudioPanelProps = {
  audio: VideoAudio;
  onAudioChange: (audio: VideoAudio) => void;
};

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";
const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function VideoAudioPanel({audio, onAudioChange}: VideoAudioPanelProps) {
  const update = (patch: Partial<VideoAudio>) =>
    onAudioChange({...audio, ...patch});

  const resetAll = () => onAudioChange({});

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Audio mute toggle */}
        <AccordionItem value="mute">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              {audio.mute ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
              Audio Controls
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="flex items-center justify-between py-2">
              <Label className="text-xs font-medium">Mute Audio</Label>
              <Switch
                checked={!!audio.mute}
                onCheckedChange={checked =>
                  update({mute: checked || undefined})
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Audio extraction */}
        <AccordionItem value="extract">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Music2 className="size-4" />
              Extract Audio
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="flex items-center justify-between py-2">
              <Label className="text-xs font-medium">Extract to File</Label>
              <Switch
                checked={!!audio.extractAudio}
                onCheckedChange={checked =>
                  update({extractAudio: checked || undefined})
                }
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Enable to generate an audio-only output (MP3 / AAC depending on
              codec)
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
