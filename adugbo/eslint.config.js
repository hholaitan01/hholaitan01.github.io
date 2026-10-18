import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";

// Browser tests run in Node but evaluate callbacks in the page, so they see both sets of globals.
const nodeAndBrowser = Object.fromEntries(
  ["process", "console", "URL", "setTimeout", "clearTimeout", "window", "document", "performance", "Buffer", "localStorage", "requestAnimationFrame", "fetch", "WebSocket"].map((g) => [g, "readonly"]),
);

export default tseslint.config(
  { ignores: ["dist", "play", "node_modules", "public", "test-results", "tools/pipeline", "server/.wrangler", "server/node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { "react-hooks": hooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  { files: ["tests/e2e/**/*.mjs", "tools/**/*.mjs", "server/test/**/*.mjs"], languageOptions: { globals: nodeAndBrowser } },
);
