"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Prism from "prismjs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  oklchToRgb,
  rgbToHsl,
  rgbToHex,
  hslToRgb,
  rgbToOklch,
  hexToRgb,
  parseInput,
} from "./utils";

const COLOR_TYPES = [
  { value: "oklch", label: "OKLCH" },
  { value: "hsl", label: "HSL" },
  { value: "hex", label: "HEX" },
  { value: "rgb", label: "RGB" },
];

export function ConverterForm() {
  const [inputType, setInputType] = useState("oklch");
  const [outputType, setOutputType] = useState("hsl");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string>("");
  const [colorSwatches, setColorSwatches] = useState<any[]>([]);

  const handleConvert = () => {
    const parsed = parseInput(input, inputType);
    let out = "";
    let swatches: any[] = [];
    if (inputType === "oklch" && outputType === "hsl") {
      parsed.forEach((color: any) => {
        const { l, c, h } = color.oklch;
        const [r, g, b] = oklchToRgb(l, c, h);
        const [hue, sat, light] = rgbToHsl(r, g, b);
        out += `--${color.name}: ${hue}, ${sat}%, ${light}%;\n`;
        swatches.push({
          name: color.name,
          value: `hsl(${hue}, ${sat}%, ${light}%)`,
          display: `hsl(${hue}, ${sat}%, ${light}%)`,
        });
      });
    } else if (inputType === "oklch" && outputType === "hex") {
      parsed.forEach((color: any) => {
        const { l, c, h } = color.oklch;
        const [r, g, b] = oklchToRgb(l, c, h);
        const hex = rgbToHex(r, g, b);
        out += `--${color.name}: ${hex};\n`;
        swatches.push({ name: color.name, value: hex, display: hex });
      });
    } else if (inputType === "oklch" && outputType === "rgb") {
      parsed.forEach((color: any) => {
        const { l, c, h } = color.oklch;
        const [r, g, b] = oklchToRgb(l, c, h);
        out += `--${color.name}: ${r}, ${g}, ${b};\n`;
        swatches.push({
          name: color.name,
          value: `rgb(${r}, ${g}, ${b})`,
          display: `rgb(${r}, ${g}, ${b})`,
        });
      });
    } else if (inputType === "hsl" && outputType === "oklch") {
      parsed.forEach((color: any) => {
        const { h, s, l } = color.hsl;
        const [r, g, b] = hslToRgb(h, s, l);
        const [okl, okc, okh] = rgbToOklch(r, g, b);
        out += `--${color.name}: ${okl} ${okc} ${okh};\n`;
        swatches.push({
          name: color.name,
          value: `oklch(${okl} ${okc} ${okh})`,
          display: `oklch(${okl} ${okc} ${okh})`,
        });
      });
    } else if (inputType === "hsl" && outputType === "hex") {
      parsed.forEach((color: any) => {
        const { h, s, l } = color.hsl;
        const [r, g, b] = hslToRgb(h, s, l);
        const hex = rgbToHex(r, g, b);
        out += `--${color.name}: ${hex};\n`;
        swatches.push({ name: color.name, value: hex, display: hex });
      });
    } else if (inputType === "hsl" && outputType === "rgb") {
      parsed.forEach((color: any) => {
        const { h, s, l } = color.hsl;
        const [r, g, b] = hslToRgb(h, s, l);
        out += `--${color.name}: ${r}, ${g}, ${b};\n`;
        swatches.push({
          name: color.name,
          value: `rgb(${r}, ${g}, ${b})`,
          display: `rgb(${r}, ${g}, ${b})`,
        });
      });
    } else if (inputType === "rgb" && outputType === "oklch") {
      parsed.forEach((color: any) => {
        const { r, g, b } = color.rgb;
        const [okl, okc, okh] = rgbToOklch(r, g, b);
        out += `--${color.name}: ${okl} ${okc} ${okh};\n`;
        swatches.push({
          name: color.name,
          value: `oklch(${okl} ${okc} ${okh})`,
          display: `oklch(${okl} ${okc} ${okh})`,
        });
      });
    } else if (inputType === "rgb" && outputType === "hsl") {
      parsed.forEach((color: any) => {
        const { r, g, b } = color.rgb;
        const [h, s, l] = rgbToHsl(r, g, b);
        out += `--${color.name}: ${h}, ${s}%, ${l}%;\n`;
        swatches.push({
          name: color.name,
          value: `hsl(${h}, ${s}%, ${l}%)`,
          display: `hsl(${h}, ${s}%, ${l}%)`,
        });
      });
    } else if (inputType === "rgb" && outputType === "hex") {
      parsed.forEach((color: any) => {
        const { r, g, b } = color.rgb;
        const hex = rgbToHex(r, g, b);
        out += `--${color.name}: ${hex};\n`;
        swatches.push({ name: color.name, value: hex, display: hex });
      });
    } else if (inputType === "hex" && outputType === "oklch") {
      parsed.forEach((color: any) => {
        const { hex } = color;
        const [r, g, b] = hexToRgb(hex);
        const [okl, okc, okh] = rgbToOklch(r, g, b);
        out += `--${color.name}: ${okl} ${okc} ${okh};\n`;
        swatches.push({
          name: color.name,
          value: `oklch(${okl} ${okc} ${okh})`,
          display: `oklch(${okl} ${okc} ${okh})`,
        });
      });
    } else if (inputType === "hex" && outputType === "hsl") {
      parsed.forEach((color: any) => {
        const { hex } = color;
        const [r, g, b] = hexToRgb(hex);
        const [h, s, l] = rgbToHsl(r, g, b);
        out += `--${color.name}: ${h}, ${s}%, ${l}%;\n`;
        swatches.push({
          name: color.name,
          value: `hsl(${h}, ${s}%, ${l}%)`,
          display: `hsl(${h}, ${s}%, ${l}%)`,
        });
      });
    } else if (inputType === "hex" && outputType === "rgb") {
      parsed.forEach((color: any) => {
        const { hex } = color;
        const [r, g, b] = hexToRgb(hex);
        out += `--${color.name}: ${r}, ${g}, ${b};\n`;
        swatches.push({
          name: color.name,
          value: `rgb(${r}, ${g}, ${b})`,
          display: `rgb(${r}, ${g}, ${b})`,
        });
      });
    } else if (inputType === outputType) {
      parsed.forEach((color: any) => {
        let val = color.originalValues;
        out += `--${color.name}: ${val};\n`;
        let swatchVal = val;
        if (outputType === "hsl") swatchVal = `hsl(${val})`;
        if (outputType === "rgb") swatchVal = `rgb(${val})`;
        if (outputType === "oklch") swatchVal = `oklch(${val})`;
        swatches.push({
          name: color.name,
          value: swatchVal,
          display: swatchVal,
        });
      });
    } else {
      out = "This conversion is not yet supported.";
      swatches = [];
    }
    setOutput(out);
    setColorSwatches(swatches);
  };

  return (
    <Card className="mx-auto max-w-3xl">
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="mb-1 block font-semibold">Input Type</label>
            <Select value={inputType} onValueChange={setInputType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="mb-1 block font-semibold">Output Type</label>
            <Select value={outputType} onValueChange={setOutputType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block font-semibold">Color Codes</label>
          <Textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your color codes here...\nExample:\n--primary-500: 0.65 0.22 250;`}
          />
        </div>
        <Button size="lg" onClick={handleConvert}>
          Convert
        </Button>
        {output && (
          <>
            <Separator className="mt-6" />
            <pre className="output-section mt-6 rounded-xl border-2 bg-muted p-6">
              <h3 className="mb-4 text-lg font-semibold text-primary">
                Converted Codes
              </h3>
              <code
                className="language-css whitespace-pre-wrap font-mono text-xs"
                dangerouslySetInnerHTML={{
                  __html:
                    typeof window !== "undefined" &&
                    typeof Prism !== "undefined"
                      ? Prism.highlight(output, Prism.languages.css, "css")
                      : output,
                }}
              />
            </pre>
            {colorSwatches.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {colorSwatches.map((swatch) => (
                  <div key={swatch.name} className="flex items-center gap-2">
                    <span
                      className="inline-block h-6 w-6 rounded border border-border"
                      style={{ background: swatch.value }}
                      title={swatch.display}
                    />
                    <span className="font-mono text-xs">
                      --{swatch.name}: {swatch.display}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
