import {Image, Layers, Text, Video} from "lucide-react";

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
  ImageOverlay,
  Overlay,
  SolidBlock,
  TextOverlay,
  VideoOverlay,
} from "@/types/video-transformations";

type VideoOverlayControlsProps = {
  overlay: Overlay;
  onOverlayChange: (overlay: Overlay) => void;
};

const overlayTypes = [
  {label: "Text", value: "text", icon: Text},
  {label: "Video", value: "video", icon: Video},
  {label: "Image", value: "image", icon: Image},
  {label: "Solid", value: "solid", icon: Layers},
];

export function VideoOverlayPanel({
  overlay,
  onOverlayChange,
}: VideoOverlayControlsProps) {
  const update = (patch: Partial<Overlay>) => {
    if ("type" in patch && patch.type !== overlay.type) {
      switch (patch.type) {
        case "text":
          onOverlayChange({
            type: "text",
            text: "",
            fontFamily: "Roboto",
            color: "#000000",
            backgroundColor: "#FFFFFF",
            fontSize: 16,
            align: "center",
            x: 0,
            y: 0,
            opacity: 1,
          } as TextOverlay);
          break;
        case "video":
          onOverlayChange({
            type: "video",
            src: "",
            width: 100,
            height: 100,
            opacity: 1,
            x: 0,
            y: 0,
            startOffset: 0,
            duration: undefined,
          } as VideoOverlay);
          break;
        case "image":
          onOverlayChange({
            type: "image",
            src: "",
            width: 100,
            height: 100,
            opacity: 1,
            x: 0,
            y: 0,
          } as ImageOverlay);
          break;
        case "solid":
          onOverlayChange({
            type: "solid",
            color: "#FFFFFF",
            opacity: 1,
            width: 100,
            height: 100,
            radius: 0,
            x: 0,
            y: 0,
          } as SolidBlock);
          break;
      }
    } else {
      onOverlayChange({...overlay, ...patch} as Overlay);
    }
  };

  function safeEncodeURL(url: string) {
    try {
      const u = new URL(url);
      return u.toString();
    } catch {
      return encodeURIComponent(url);
    }
  }

  const IMAGEKIT_FONTS = [
    "AbrilFatFace",
    "Amaranth",
    "Arvo",
    "Audiowide",
    "Chivo",
    "Crimson Text",
    "exo",
    "Fredoka One",
    "Gravitas One",
    "Kanit",
    "Lato",
    "Lobster",
    "Lora",
    "Monoton",
    "Montserrat",
    "PT Mono",
    "PT_Serif",
    "Open Sans",
    "Roboto",
    "Old Standard",
    "Ubuntu",
    "Vollkorn",
  ];

  const resetOverlay = () => {
    onOverlayChange({} as Overlay);
  };

  const safeNumber = (value?: string | number, fallback = 0) => {
    if (value === undefined || value === null) return fallback;

    const num = typeof value === "string" ? parseFloat(value) : Number(value);

    return isNaN(num) ? fallback : num;
  };

  return (
    <div className="h-full flex flex-col space-y-4 md:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 p-1">
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-900">
          Overlay Type
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {overlayTypes.map(type => (
            <Button
              key={type.value}
              variant={overlay.type === type.value ? "default" : "outline"}
              onClick={() => {
                switch (type.value) {
                  case "text":
                    onOverlayChange({
                      type: "text",
                      text: "",
                      fontFamily: "Roboto",
                      color: "#000000",
                      backgroundColor: "#FFFFFF",
                      fontSize: 16,
                      align: "center",
                      x: 0,
                      y: 0,
                      opacity: 1,
                    } as TextOverlay);
                    break;
                  case "video":
                    onOverlayChange({
                      type: "video",
                      src: "",
                      width: 100,
                      height: 100,
                      opacity: 1,
                      x: 0,
                      y: 0,
                      startOffset: 0,
                      duration: undefined,
                    } as VideoOverlay);
                    break;
                  case "image":
                    onOverlayChange({
                      type: "image",
                      src: "",
                      width: 100,
                      height: 100,
                      opacity: 1,
                      x: 0,
                      y: 0,
                    } as ImageOverlay);
                    break;
                  case "solid":
                    onOverlayChange({
                      type: "solid",
                      color: "#FFFFFF",
                      opacity: 1,
                      width: 100,
                      height: 100,
                      radius: 0,
                      x: 0,
                      y: 0,
                    } as SolidBlock);
                    break;
                }
              }}
              className="w-full h-10"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <Accordion type="multiple" className="w-full">
        {overlay.type === "text" && (
          <AccordionItem value="text-settings">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 font-semibold">
                <Text className="size-4" /> Text Settings
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-1">
              <div className="space-y-2">
                <Label className="font-medium">Text Content</Label>
                <Input
                  value={(overlay as TextOverlay).text || ""}
                  onChange={e =>
                    update({...(overlay as TextOverlay), text: e.target.value})
                  }
                  placeholder="Enter overlay text"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-medium">Font Family</Label>
                <Select
                  value={(overlay as TextOverlay).fontFamily ?? "Roboto"}
                  onValueChange={value =>
                    update({
                      ...(overlay as TextOverlay),
                      fontFamily: value,
                    })
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGEKIT_FONTS.map(font => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">Font Size</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as TextOverlay).fontSize, 16)}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        fontSize: parseInt(e.target.value) || 16,
                      })
                    }
                    min="8"
                    max="200"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={(overlay as TextOverlay).color ?? "#000000"}
                      onChange={e =>
                        update({
                          ...(overlay as TextOverlay),
                          color: e.target.value,
                        })
                      }
                      className="h-10 w-14 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={(overlay as TextOverlay).color ?? "#000000"}
                      onChange={e =>
                        update({
                          ...(overlay as TextOverlay),
                          color: e.target.value,
                        })
                      }
                      className="h-10 flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={
                        (overlay as TextOverlay).backgroundColor ?? "#FFFFFF"
                      }
                      onChange={e =>
                        update({
                          ...(overlay as TextOverlay),
                          backgroundColor: e.target.value,
                        })
                      }
                      className="h-10 w-14 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={
                        (overlay as TextOverlay).backgroundColor ?? "#FFFFFF"
                      }
                      onChange={e =>
                        update({
                          ...(overlay as TextOverlay),
                          backgroundColor: e.target.value,
                        })
                      }
                      className="h-10 flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Text Alignment</Label>
                  <Select
                    value={(overlay as TextOverlay).align ?? "center"}
                    onValueChange={value =>
                      update({
                        ...(overlay as TextOverlay),
                        align: value as "left" | "center" | "right",
                      })
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">X Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as TextOverlay).x, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Y Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as TextOverlay).y, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-medium">Opacity</Label>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {Math.round(((overlay as TextOverlay).opacity ?? 1) * 100)}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[(overlay as TextOverlay).opacity ?? 1]}
                  onValueChange={([value]) =>
                    update({
                      ...(overlay as TextOverlay),
                      opacity: value,
                    })
                  }
                  className="w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {overlay.type === "video" && (
          <AccordionItem value="video-settings">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 font-semibold">
                <Video className="size-4" /> Video Settings
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-1">
              <div className="space-y-2">
                <Label className="font-medium">Video URL</Label>
                <Input
                  placeholder="https://example.com/video.mp4"
                  className="h-10"
                  value={(overlay as VideoOverlay).src || ""}
                  onChange={e => update({src: safeEncodeURL(e.target.value)})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">Width (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as VideoOverlay).width, 100)}
                    onChange={e =>
                      update({
                        ...(overlay as VideoOverlay),
                        width: parseInt(e.target.value) || 100,
                      })
                    }
                    min="10"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Height (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as VideoOverlay).height, 100)}
                    onChange={e =>
                      update({
                        ...(overlay as VideoOverlay),
                        height: parseInt(e.target.value) || 100,
                      })
                    }
                    min="10"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">X Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as VideoOverlay).x, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as VideoOverlay),
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Y Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as VideoOverlay).y, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as VideoOverlay),
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">Start Offset (ms)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as VideoOverlay).startOffset, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as VideoOverlay),
                        startOffset: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Duration (ms)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as VideoOverlay).duration)}
                    onChange={e =>
                      update({
                        ...(overlay as VideoOverlay),
                        duration: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    min="0"
                    placeholder="Auto"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-medium">Opacity</Label>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {Math.round(((overlay as VideoOverlay).opacity ?? 1) * 100)}
                    %
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[(overlay as VideoOverlay).opacity ?? 1]}
                  onValueChange={([value]) =>
                    update({
                      ...(overlay as VideoOverlay),
                      opacity: value,
                    })
                  }
                  className="w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {overlay.type === "image" && (
          <AccordionItem value="image-settings">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 font-semibold">
                <Image className="size-4" /> Image Settings
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-1">
              <div className="space-y-2">
                <Label className="font-medium">Image URL</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  className="h-10"
                  value={(overlay as ImageOverlay).src || ""}
                  onChange={e => update({src: safeEncodeURL(e.target.value)})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">Width (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as ImageOverlay).width, 100)}
                    onChange={e =>
                      update({
                        ...(overlay as ImageOverlay),
                        width: parseInt(e.target.value) || 100,
                      })
                    }
                    min="10"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Height (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as ImageOverlay).height, 100)}
                    onChange={e =>
                      update({
                        ...(overlay as ImageOverlay),
                        height: parseInt(e.target.value) || 100,
                      })
                    }
                    min="10"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">X Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as ImageOverlay).x, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as ImageOverlay),
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Y Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as ImageOverlay).y, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as ImageOverlay),
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-medium">Opacity</Label>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {Math.round(((overlay as ImageOverlay).opacity ?? 1) * 100)}
                    %
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[(overlay as ImageOverlay).opacity ?? 1]}
                  onValueChange={([value]) =>
                    update({
                      ...(overlay as ImageOverlay),
                      opacity: value,
                    })
                  }
                  className="w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {overlay.type === "solid" && (
          <AccordionItem value="solid-settings">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 font-semibold">
                <Layers className="size-4" /> Solid Settings
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-1">
              <div className="space-y-2">
                <Label className="font-medium">Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={(overlay as SolidBlock).color ?? "#FFFFFF"}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        color: e.target.value,
                      })
                    }
                    className="h-10 w-14 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={(overlay as SolidBlock).color ?? "#FFFFFF"}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        color: e.target.value,
                      })
                    }
                    className="h-10 flex-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">Width (px)</Label>
                  <Input
                    type="number"
                    value={(overlay as SolidBlock).width ?? 100}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        width: parseInt(e.target.value) || 100,
                      })
                    }
                    min="10"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Height (px)</Label>
                  <Input
                    type="number"
                    value={(overlay as SolidBlock).height ?? 100}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        height: parseInt(e.target.value) || 100,
                      })
                    }
                    min="10"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Radius (px)</Label>
                  <Input
                    type="number"
                    value={(overlay as SolidBlock).radius ?? 0}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        radius: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">X Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as SolidBlock).x, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Y Position (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as SolidBlock).y, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as SolidBlock),
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-10"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-medium">Opacity</Label>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {Math.round(((overlay as SolidBlock).opacity ?? 1) * 100)}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[(overlay as SolidBlock).opacity ?? 1]}
                  onValueChange={([value]) =>
                    update({
                      ...(overlay as SolidBlock),
                      opacity: value,
                    })
                  }
                  className="w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      <div className="pt-4 flex gap-2 border-t border-gray-200">
        <Button
          variant="outline"
          className="flex-1 h-10"
          onClick={resetOverlay}
        >
          Reset Overlay
        </Button>
      </div>
    </div>
  );
}
