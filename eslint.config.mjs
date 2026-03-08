import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

const shareButtonComponents = {
  BlueskyShareButton: "button",
  EmailShareButton: "button",
  FacebookMessengerShareButton: "button",
  FacebookShareButton: "button",
  GabShareButton: "button",
  HatenaShareButton: "button",
  InstapaperShareButton: "button",
  LineShareButton: "button",
  LinkedinShareButton: "button",
  LivejournalShareButton: "button",
  MailruShareButton: "button",
  OKShareButton: "button",
  PinterestShareButton: "button",
  PocketShareButton: "button",
  RedditShareButton: "button",
  TelegramShareButton: "button",
  ThreadsShareButton: "button",
  TumblrShareButton: "button",
  TwitterShareButton: "button",
  ViberShareButton: "button",
  VKShareButton: "button",
  WeiboShareButton: "button",
  WhatsappShareButton: "button",
  WorkplaceShareButton: "button",
};

export default [
  {
    ignores: [
      "demo/assets/**",
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
    plugins: { "@typescript-eslint": ts },
    rules: {
      ...ts.configs.strict.rules,
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
      "jsx-a11y": {
        components: shareButtonComponents,
      },
    },
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
