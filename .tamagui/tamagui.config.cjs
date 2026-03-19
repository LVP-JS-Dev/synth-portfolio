var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// tamagui.config.ts
var tamagui_config_exports = {};
__export(tamagui_config_exports, {
  config: () => config,
  default: () => tamagui_config_default
});
module.exports = __toCommonJS(tamagui_config_exports);

// node_modules/tamagui/dist/esm/createTamagui.mjs
var import_core = require("@tamagui/core");
var createTamagui = process.env.NODE_ENV !== "development" ? import_core.createTamagui : (conf) => {
  const sizeTokenKeys = ["$true"], hasKeys = /* @__PURE__ */ __name((expectedKeys, obj) => expectedKeys.every((k) => typeof obj[k] < "u"), "hasKeys"), tamaguiConfig = (0, import_core.createTamagui)(conf);
  for (const name of ["size", "space"]) {
    const tokenSet = tamaguiConfig.tokensParsed[name];
    if (!tokenSet) throw new Error(`Expected tokens for "${name}" in ${Object.keys(tamaguiConfig.tokensParsed).join(", ")}`);
    if (!hasKeys(sizeTokenKeys, tokenSet)) throw new Error(`
createTamagui() missing expected tokens.${name}:

Received: ${Object.keys(tokenSet).join(", ")}

Expected: ${sizeTokenKeys.join(", ")}

Tamagui expects a "true" key that is the same value as your default size. This is so 
it can size things up or down from the defaults without assuming which keys you use.

Please define a "true" or "$true" key on your size and space tokens like so (example):

size: {
  sm: 2,
  md: 10,
  true: 10, // this means "md" is your default size
  lg: 20,
}

`);
  }
  const expected = Object.keys(tamaguiConfig.tokensParsed.size);
  for (const name of ["radius", "zIndex"]) {
    const tokenSet = tamaguiConfig.tokensParsed[name], received = Object.keys(tokenSet);
    if (!received.some((rk) => expected.includes(rk))) throw new Error(`
createTamagui() invalid tokens.${name}:

Received: ${received.join(", ")}

Expected a subset of: ${expected.join(", ")}

`);
  }
  return tamaguiConfig;
};

// node_modules/tamagui/dist/esm/index.mjs
var import_core2 = require("@tamagui/core");

// node_modules/@tamagui/font-inter/dist/esm/index.mjs
var import_core3 = require("@tamagui/core");
var createInterFont = /* @__PURE__ */ __name((font = {}, {
  sizeLineHeight = /* @__PURE__ */ __name((size) => size + 10, "sizeLineHeight"),
  sizeSize = /* @__PURE__ */ __name((size) => size * 1, "sizeSize")
} = {}) => {
  const size = Object.fromEntries(Object.entries({
    ...defaultSizes,
    ...font.size
  }).map(([k, v]) => [k, sizeSize(+v)]));
  return (0, import_core3.createFont)({
    family: import_core3.isWeb ? 'Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : "Inter",
    lineHeight: Object.fromEntries(Object.entries(size).map(([k, v]) => [k, sizeLineHeight((0, import_core3.getVariableValue)(v))])),
    weight: {
      4: "300"
    },
    letterSpacing: {
      4: 0
    },
    ...font,
    size
  });
}, "createInterFont");
var defaultSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  true: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134
};

// tamagui.config.ts
var interFont = createInterFont();
var jetBrainsFont = (0, import_core2.createFont)({
  family: "JetBrains Mono, monospace",
  size: { 1: 12, 2: 13, 3: 14, 4: 16, 5: 18, 6: 20, 7: 36, 8: 48, 9: 58 },
  lineHeight: { 1: 1.1, 2: 1.45, 3: 1.5, 4: 1.55, 5: 1.6 },
  weight: { 400: "400", 500: "500", 700: "700" },
  letterSpacing: { 1: 0, 2: 1, 3: 1.2 }
});
var tokens = (0, import_core2.createTokens)({
  color: {
    bgBase: "#1A1630",
    bgSurface: "#221C3E",
    bgSurface2: "#2C2550",
    accentCyan: "#52FFF6",
    accentPink: "#FF4FD8",
    accentYellow: "#FFE86F",
    textPrimary: "#FFF9FF",
    textSecondary: "#D7CCFF",
    glowSoft: "rgba(82, 255, 246, 0.4)",
    glowMedium: "rgba(82, 255, 246, 0.66)",
    glowHard: "rgba(255, 79, 216, 0.8)",
    glowPink: "rgba(255, 79, 216, 0.66)"
  },
  space: {
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    8: 48,
    10: 64,
    true: 16
  },
  size: {
    true: 16
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    round: 999,
    true: 12
  },
  zIndex: { true: 1 }
});
var config = createTamagui({
  fonts: {
    heading: jetBrainsFont,
    body: interFont
  },
  tokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" }
  },
  themes: {
    light: {
      background: tokens.color.bgBase,
      color: tokens.color.textPrimary
    },
    dark: {
      background: tokens.color.bgBase,
      color: tokens.color.textPrimary
    }
  }
});
var tamagui_config_default = config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
