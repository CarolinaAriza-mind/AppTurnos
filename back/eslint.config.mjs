import globals from "globals";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      extend: ["plugin:@typescript-eslint/recommended"],
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        include: ["src", "eslint.config.mjs"],
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
    },
  },
]);
