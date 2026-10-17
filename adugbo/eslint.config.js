import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";

// Browser tests run in Node but evaluate callbacks in the page, so they see both sets of globals.
const nodeAndBrowser = Object.fromEntries(
  ["process", "console", "URL", "setTimeout", "clearTimeout", "window", "document", "performance", "Buffer"].map((g) => [g, "readonly"]),
);

export default tseslint.config(
  { ignores: ["dist", "node_modules", "public", "test-results", "tools/pipeline"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { plugins: { "react-hooks": hooks }, rules: { "react-hooks/rules-of-hooks": "error", "react-hooks/exhaustive-deps": "warn" } },
  { files: ["tests/e2e/**/*.mjs", "tools/**/*.mjs"], languageOptions: { globals: nodeAndBrowser } },
);
