const js = require("@eslint/js");
const ts = require("typescript-eslint");
const prettier = require("eslint-config-prettier");

module.exports = ts.config({
  files: ["src/**/*.{ts,js}"],
  languageOptions: {
    parser: ts.parser,
    parserOptions: {
      project: "./tsconfig.json",
    },
    globals: {
      console: "readonly",
      process: "readonly",
    },
  },
  ignores: ["dist/**"],

  extends: [js.configs.recommended, ...ts.configs.recommended, prettier],

  rules: {
    "no-unused-vars": "warn",
    "no-undef": "off",
  },
});
