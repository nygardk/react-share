import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

const reactCompat = fixupPluginRules(react);
const reactHooksCompat = fixupPluginRules(reactHooks);
const jsxA11yCompat = fixupPluginRules(jsxA11y);

export default [
  {
    ignores: [
      "demo/assets/**",
      "demo/dist/**",
      "dist/**",
      "**/.DS_Store",
      "**/*.css",
      "**/*.html",
      "**/*.png",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...ts.configs.strict.rules,
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "no-undef": "off",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}", "test/**/*.{ts,tsx}", "demo/**/*.{ts,tsx}"],
    ignores: ["demo/declarations.d.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportDefaultDeclaration",
          message: "Default exports are not allowed.",
        },
      ],
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      react: reactCompat,
      "react-hooks": reactHooksCompat,
      "jsx-a11y": jsxA11yCompat,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "jsx-a11y/control-has-associated-label": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    name: "Prettier",
    plugins: { prettier },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
  },
];
