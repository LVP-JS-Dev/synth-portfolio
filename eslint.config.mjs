import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const restrictedColorPattern = "#(1A1630|221C3E|2C2550|F7F4FF|D7CCFF|36F9F6|FF7EDB|FEDE5D|FF4D6D)";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: `Literal[value=/${restrictedColorPattern}/i]`,
          message: "Use CSS tokens instead of hardcoded design colors.",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "tokens.css",
    ".tamagui/**",
  ]),
]);

export default eslintConfig;
