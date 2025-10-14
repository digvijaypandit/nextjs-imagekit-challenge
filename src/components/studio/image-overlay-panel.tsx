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
  {label: "Text", value: "text"},
  {label: "Image", value: "image"},
  {label: "Gradient", value: "gradient"},
  {label: "Solid", value: "solid"},
];

export function ImageOverlayPanel({
  overlay,
  onOverlayChange,
}: OverlayControlsProps) {
  const update = (patch: Partial<Overlay>) => {
    if ("type" in patch && patch.type !== overlay.type) {
      switch (patch.type) {
        case "text":
          onOverlayChange({type: "text", text: ""} as TextOverlay);
          break;
        case "image":
          onOverlayChange({type: "image", src: ""} as ImageOverlay);
          break;
        case "gradient":
          onOverlayChange({type: "gradient"} as GradientBlock);
          break;
        case "solid":
          onOverlayChange({type: "solid", color: "#FFFFFF"} as SolidBlock);
          break;
      }
    } else {
      onOverlayChange({...overlay, ...patch} as Overlay);
    }
  };

  const resetOverlay = () => {
    switch (overlay.type) {
      case "text":
        onOverlayChange({type: "text", text: "Sample Text"} as TextOverlay);
        break;
      case "image":
        onOverlayChange({
          type: "image",
          src: "https://via.placeholder.com/150",
          width: 150,
          height: 150,
        } as ImageOverlay);
        break;
      case "gradient":
        onOverlayChange({
          type: "gradient",
          fromColor: "#000000",
          toColor: "#FFFFFF",
          width: 200,
          height: 200,
        } as GradientBlock);
        break;
      case "solid":
        onOverlayChange({
          type: "solid",
          color: "#FFFFFF",
          width: 200,
          height: 200,
          opacity: 100,
        } as SolidBlock);
        break;
    }
  };

  const safeNumber = (value?: number, fallback = 0) =>
    value !== undefined && !isNaN(value) ? value : fallback;

  return (
    <div className="h-full flex flex-col space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Overlay Type */}
        <AccordionItem value="overlay-type">
          <AccordionTrigger className="py-3 flex items-center gap-2">
            <Layers className="size-4" /> Overlay Type
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 px-0.5">
            <Select
              value={overlay.type}
              onValueChange={value => {
                switch (value) {
                  case "text":
                    onOverlayChange({type: "text", text: ""} as TextOverlay);
                    break;
                  case "image":
                    onOverlayChange({type: "image", src: ""} as ImageOverlay);
                    break;
                  case "gradient":
                    onOverlayChange({type: "gradient"} as GradientBlock);
                    break;
                  case "solid":
                    onOverlayChange({
                      type: "solid",
                      color: "#FFFFFF",
                    } as SolidBlock);
                    break;
                }
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {overlayTypes.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Text Overlay Settings */}
        {overlay.type === "text" && (
          <AccordionItem value="text-settings">
            <AccordionTrigger className="py-3 flex items-center gap-2">
              <Text className="size-4" /> Text Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2 px-0.5">
              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={(overlay as TextOverlay).text}
                  onChange={e =>
                    update({...(overlay as TextOverlay), text: e.target.value})
                  }
                  placeholder="Overlay Text"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Font Size</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as TextOverlay).fontSize, 16)}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        fontSize: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <Input
                    type="color"
                    value={(overlay as TextOverlay).color ?? "#000000"}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        color: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Font Family</Label>
                  <Input
                    value={(overlay as TextOverlay).fontFamily ?? ""}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        fontFamily: e.target.value,
                      })
                    }
                    placeholder="Font Family"
                  />
                </div>
                <div>
                  <Label>Background Color</Label>
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Padding</Label>
                  <Input
                    value={(overlay as TextOverlay).padding ?? "0"}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        padding: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Align</Label>
                  <Select
                    value={(overlay as TextOverlay).align ?? "left"}
                    onValueChange={value =>
                      update({
                        ...(overlay as TextOverlay),
                        align: value as "left" | "center" | "right",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Rotation</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as TextOverlay).rotation, 0)}
                    onChange={e =>
                      update({
                        ...(overlay as TextOverlay),
                        rotation: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Image Overlay Settings */}
        {overlay.type === "image" && (
          <AccordionItem value="image-settings">
            <AccordionTrigger className="py-3 flex items-center gap-2">
              <Image className="size-4" /> Image Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2 px-0.5">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={(overlay as ImageOverlay).src}
                  onChange={e =>
                    update({...(overlay as ImageOverlay), src: e.target.value})
                  }
                  placeholder="Image URL"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Width</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as ImageOverlay).width, 100)}
                    onChange={e =>
                      update({
                        ...(overlay as ImageOverlay),
                        width: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={safeNumber((overlay as ImageOverlay).height, 100)}
                    onChange={e =>
                      update({
                        ...(overlay as ImageOverlay),
                        height: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Opacity</Label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[(overlay as ImageOverlay).opacity ?? 100]}
                    onValueChange={([value]) =>
                      update({...(overlay as ImageOverlay), opacity: value})
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Gradient Overlay Settings */}
        {overlay.type === "gradient" && (
          <AccordionItem value="gradient-settings">
            <AccordionTrigger className="py-3 flex items-center gap-2">
              <Layers className="size-4" /> Gradient Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>From Color</Label>
                  <Input
                    type="color"
                    value={(overlay as GradientBlock).fromColor ?? "#000000"}
                    onChange={e =>
                      update({
                        ...(overlay as GradientBlock),
                        fromColor: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>To Color</Label>
                  <Input
                    type="color"
                    value={(overlay as GradientBlock).toColor ?? "#FFFFFF"}
                    onChange={e =>
                      update({
                        ...(overlay as GradientBlock),
                        toColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Solid Overlay Settings */}
        {overlay.type === "solid" && (
          <AccordionItem value="solid-settings">
            <AccordionTrigger className="py-3 flex items-center gap-2">
              <Layers className="size-4" /> Solid Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2 px-0.5">
              <Label>Color</Label>
              <Input
                type="color"
                value={(overlay as SolidBlock).color}
                onChange={e =>
                  update({...(overlay as SolidBlock), color: e.target.value})
                }
              />
              <Label>Opacity ({(overlay as SolidBlock).opacity ?? 100}%)</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[(overlay as SolidBlock).opacity ?? 100]}
                onValueChange={([value]) =>
                  update({...(overlay as SolidBlock), opacity: value})
                }
              />
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      <div className="pt-4 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={resetOverlay}>
          Reset Overlay
        </Button>
      </div>
    </div>
  );
}
