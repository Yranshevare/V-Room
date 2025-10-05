import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Allow "any" in TypeScript
      "@typescript-eslint/no-explicit-any": "off",

      // Relax exhaustive-deps for useEffect and useCallback
      "react-hooks/exhaustive-deps": "warn",

      // Optional: disable strict JSX rule if needed
      "react/react-in-jsx-scope": "off",

      // Optional: allow unused vars for debugging
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
];

export default eslintConfig;
