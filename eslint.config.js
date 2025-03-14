import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      node,
      security,
    },
    rules: {
      "consistent-return": "warn", // Ensure consistent returns in routes
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignore unused args like (req, res, next)
      "handle-callback-err": "error", // Enforce error handling in middleware
      "no-process-exit": "error", // Avoid directly exiting the process
      "security/detect-object-injection": "warn", // Avoid object injection vulnerabilities
      "node/no-missing-import": "error", // Check missing ESM imports
      "node/no-unsupported-features/es-syntax": "off", // Allow ESM syntax
      "node/no-extraneous-import": "error", // Prevent unnecessary dependencies in imports
    },
  },
  importPlugin.flatConfigs.recommended,
  pluginJs.configs.recommended,
  node.configs.recommended,
  security.configs.recommended,
  eslintPluginPrettierRecommended,
];
