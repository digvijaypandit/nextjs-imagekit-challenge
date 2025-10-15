import {Image, Layers, Text} from "lucide-react";

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
  GradientBlock,
  ImageOverlay,
  Overlay,
  SolidBlock,
  TextOverlay,
} from "@/types/image-transformations";

type OverlayControlsProps = {
  overlay: Overlay;
  onOverlayChange: (overlay: Overlay) => void;
};

const overlayTypes = [
  {label: "Text", value: "text", icon: Text},
  {label: "Image", value: "image", icon: Image},
  {label: "Gradient", value: "gradient", icon: Layers},
  {label: "Solid", value: "solid", icon: Layers},
];

export function ImageOverlayPanel({
  overlay,
  onOverlayChange,
}: OverlayControlsProps) {
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
            padding: "0",
            align: "center",
            fontSize: 16,
            rotation: 0,
          } as TextOverlay);
          break;
        case "image":
          onOverlayChange({
            type: "image",
            src: "",
            width: 100,
            height: 100,
            opacity: 100,
            x: 0,
            y: 0,
          } as ImageOverlay);
          break;
        case "gradient":
          onOverlayChange({
            type: "gradient",
            fromColor: "#000000",
            toColor: "#FFFFFF",
            direction: "top",
            stopPoint: 0,
            width: 100,
            height: 100,
            radius: 0,
          } as GradientBlock);
          break;
        case "solid":
          onOverlayChange({
            type: "solid",
            color: "#FFFFFF",
            opacity: 100,
            width: 100,
            height: 100,
            radius: 0,
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
    onOverlayChange({
      type: undefined,
      text: undefined,
      src: undefined,
      fromColor: undefined,
      toColor: undefined,
      color: undefined,
      width: undefined,
      height: undefined,
      opacity: undefined,
    });
  };

  const safeNumber = (value?: number, fallback = 0) =>
    value !== undefined && !isNaN(value) ? value : fallback;

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
                      padding: "0",
                      align: "center",
                      fontSize: 16,
                      rotation: 0,
                    } as TextOverlay);
                    break;
                  case "image":
                    onOverlayChange({
                      type: "image",
                      src: "",
                      width: 100,
                      height: 100,
                      opacity: 100,
                    } as ImageOverlay);
                    break;
                  case "gradient":
                    onOverlayChange({
                      type: "gradient",
                      fromColor: "#000000",
                      toColor: "#FFFFFF",
                      direction: "top",
                      stopPoint: 0,
                      width: 100,
                      height: 100,
                      radius: 0,
                    } as GradientBlock);
                    break;
                  case "solid":
                    onOverlayChange({
                      type: "solid",
                      color: "#FFFFFF",
                      opacity: 100,
                      width: 100,
                      height: 100,
                      radius: 0,
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
                  value={(overlay as TextOverlay).text}
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
                  <Label className="font-medium">Padding</Label>
                  <Input
                    value={(overlay as TextOverlay).padding ?? "0"}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        padding: e.target.value,
                      })
                    }
                    placeholder="e.g., 10 or 10_20"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
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
                <div className="space-y-2">
                  <Label className="font-medium">Rotation (°)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as TextOverlay).rotation, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        rotation: parseInt(e.target.value) || 0,
                      })
                    }
                    min="-360"
                    max="360"
                    className="h-10"
                  />
                </div>
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
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    className="h-10"
                    onChange={e => update({src: safeEncodeURL(e.target.value)})}
                  />
                </div>
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
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-medium">Opacity</Label>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {(overlay as ImageOverlay).opacity ?? 100}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[(overlay as ImageOverlay).opacity ?? 100]}
                  onValueChange={([value]) =>
                    update({...(overlay as ImageOverlay), opacity: value})
                  }
                  className="w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        {overlay.type === "gradient" && (
          <AccordionItem value="gradient-settings">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 font-semibold">
                <Layers className="size-4" /> Gradient Settings
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-medium">From Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={(overlay as GradientBlock).fromColor ?? "#000000"}
                      onChange={e =>
                        update({
                          ...(overlay as GradientBlock),
                          fromColor: e.target.value,
                        })
                      }
                      className="h-10 w-14 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={(overlay as GradientBlock).fromColor ?? "#000000"}
                      onChange={e =>
                        update({
                          ...(overlay as GradientBlock),
                          fromColor: e.target.value,
                        })
                      }
                      className="h-10 flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">To Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={(overlay as GradientBlock).toColor ?? "#FFFFFF"}
                      onChange={e =>
                        update({
                          ...(overlay as GradientBlock),
                          toColor: e.target.value,
                        })
                      }
                      className="h-10 w-14 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={(overlay as GradientBlock).toColor ?? "#FFFFFF"}
                      onChange={e =>
                        update({
                          ...(overlay as GradientBlock),
                          toColor: e.target.value,
                        })
                      }
                      className="h-10 flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Direction</Label>
                  <Select
                    value={(overlay as GradientBlock).direction ?? "top"}
                    onValueChange={value =>
                      update({
                        ...(overlay as GradientBlock),
                        direction: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Stop Point (%)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as GradientBlock).stopPoint, 0)}
                    min={0}
                    max={100}
                    onChange={e =>
                      update({
                        ...(overlay as GradientBlock),
                        stopPoint: Number(e.target.value),
                      })
                    }
                    className="h-10 w-full border px-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Width (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as GradientBlock).width, 100)}
                    min={0}
                    onChange={e =>
                      update({
                        ...(overlay as GradientBlock),
                        width: Number(e.target.value),
                      })
                    }
                    className="h-10 w-full border px-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Height (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as GradientBlock).height, 100)}
                    min={0}
                    onChange={e =>
                      update({
                        ...(overlay as GradientBlock),
                        height: Number(e.target.value),
                      })
                    }
                    className="h-10 w-full border px-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Radius (px)</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as GradientBlock).radius, 0)}
                    min={0}
                    onChange={e =>
                      update({
                        ...(overlay as GradientBlock),
                        radius: Number(e.target.value),
                      })
                    }
                    className="h-10 w-full border px-2"
                  />
                </div>
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
              <div className="space-y-3"></div>
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
