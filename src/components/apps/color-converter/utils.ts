import { converter as culoriConverter } from "culori";
import type {
  ColorOklch,
  ColorHsl,
  ColorRgb,
  ColorHex,
  ParsedColor,
} from "./types";

export function parseOklch(input: string): ColorOklch[] {
  const lines = input.split("\n");
  const colors: ColorOklch[] = [];
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("//") || line.startsWith("/*")) continue;
    const match = line.match(/--([^:]+):\s*([^;]+);?/);
    if (match) {
      const name = match[1].trim();
      const values = match[2].trim();
      const parts = values.split(/\s+/);
      if (parts.length >= 3) {
        let l = parseFloat(parts[0].replace("%", ""));
        let c = parseFloat(parts[1]);
        let h = parseFloat(parts[2]);
        if (parts[0].includes("%")) l = l / 100;
        colors.push({ name, oklch: { l, c, h }, originalValues: values });
      }
    }
  }
  return colors;
}

export function parseHsl(input: string): ColorHsl[] {
  const lines = input.split("\n");
  const colors: ColorHsl[] = [];
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("//") || line.startsWith("/*")) continue;
    const match = line.match(/--([^:]+):\s*([^;]+);?/);
    if (match) {
      const name = match[1].trim();
      const values = match[2].trim();
      const parts = values.split(/[\,\s]+/).filter(Boolean);
      if (parts.length >= 3) {
        let h = parseFloat(parts[0]);
        let s = parseFloat(parts[1].replace("%", ""));
        let l = parseFloat(parts[2].replace("%", ""));
        colors.push({ name, hsl: { h, s, l }, originalValues: values });
      }
    }
  }
  return colors;
}

export function parseRgb(input: string): ColorRgb[] {
  const lines = input.split("\n");
  const colors: ColorRgb[] = [];
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("//") || line.startsWith("/*")) continue;
    const match = line.match(/--([^:]+):\s*([^;]+);?/);
    if (match) {
      const name = match[1].trim();
      const values = match[2].trim();
      const parts = values.split(/[\,\s]+/).filter(Boolean);
      if (parts.length >= 3) {
        let r = parseInt(parts[0]);
        let g = parseInt(parts[1]);
        let b = parseInt(parts[2]);
        colors.push({ name, rgb: { r, g, b }, originalValues: values });
      }
    }
  }
  return colors;
}

export function parseHex(input: string): ColorHex[] {
  const lines = input.split("\n");
  const colors: ColorHex[] = [];
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("//") || line.startsWith("/*")) continue;
    const match = line.match(/--([^:]+):\s*([^;]+);?/);
    if (match) {
      const name = match[1].trim();
      const value = match[2].trim();
      if (/^#([0-9a-fA-F]{3,8})$/.test(value)) {
        colors.push({ name, hex: value, originalValues: value });
      }
    }
  }
  return colors;
}

export function oklchToRgb(
  l: number,
  c: number,
  h: number,
): [number, number, number] {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  r = linearToSrgb(r);
  g = linearToSrgb(g);
  b_ = linearToSrgb(b_);
  return [
    Math.max(0, Math.min(255, Math.round(r * 255))),
    Math.max(0, Math.min(255, Math.round(g * 255))),
    Math.max(0, Math.min(255, Math.round(b_ * 255))),
  ];
}

export function linearToSrgb(val: number) {
  if (val <= 0.0031308) {
    return 12.92 * val;
  } else {
    return 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
  }
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;
  l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

export function rgbToOklch(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  const toOklch = culoriConverter("oklch");
  const oklch = toOklch({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 });
  if (!oklch) return [0, 0, 0];
  return [oklch.l, oklch.c, oklch.h ?? 0];
}

export function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function parseInput(input: string, type: string): ParsedColor[] {
  if (type === "oklch") return parseOklch(input);
  if (type === "hsl") return parseHsl(input);
  if (type === "rgb") return parseRgb(input);
  if (type === "hex") return parseHex(input);
  return [];
}
