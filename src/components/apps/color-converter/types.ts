export interface ColorOklch {
  name: string;
  oklch: { l: number; c: number; h: number };
  originalValues: string;
}

export interface ColorHsl {
  name: string;
  hsl: { h: number; s: number; l: number };
  originalValues: string;
}

export interface ColorRgb {
  name: string;
  rgb: { r: number; g: number; b: number };
  originalValues: string;
}

export interface ColorHex {
  name: string;
  hex: string;
  originalValues: string;
}

export type ParsedColor = ColorOklch | ColorHsl | ColorRgb | ColorHex;
