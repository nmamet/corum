import eslintPluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";
import eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        jsx: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: eslintPluginImport,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked
        .flatMap(({ rules }) => rules)
        .filter(Boolean)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      camelcase: "error",
      complexity: "warn",
      curly: "error",
      "default-case": "error",
      "dot-notation": "error",
      "max-depth": ["warn", { max: 4 }],
      "max-params": ["warn", 5],
      "no-else-return": "error",
      "no-lonely-if": "warn",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-unused-expressions": "warn",
      "no-warning-comments": "error",
      "@typescript-eslint/no-magic-numbers": [
        "warn",
        { ignore: [0, 1, 2, -1], ignoreEnums: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "parameter",
          leadingUnderscore: "forbid",
          format: null,
        },
        {
          selector: "parameter",
          leadingUnderscore: "allow",
          format: null,
          modifiers: ["unused"],
        },
      ],
      "@typescript-eslint/type-annotation-spacing": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          arrayDestructuring: false,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: false,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: false,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        {
          allowArgumentsExplicitlyTypedAsAny: false,
          allowDirectConstAssertionInArrowFunctions: true,
          allowedNames: [],
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "no-var": "error",
      "operator-assignment": "warn",
      "prefer-const": "error",
      "array-bracket-spacing": "error",
      "arrow-spacing": "error",
      "comma-spacing": "error",
      "eol-last": "error",
      "func-call-spacing": "error",
      "key-spacing": "error",
      "keyword-spacing": "error",
      "no-trailing-spaces": "error",
      "semi-spacing": "error",
      semi: "error",
      "space-in-parens": "error",
      "switch-colon-spacing": "error",
      "object-curly-spacing": ["error", "always"],
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: [
        "error",
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "@/business/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },
  {
    files: ["**/back/**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/front/**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/front/**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  {
    ignores: ["**/plugins/*", "**/dist/*", "**/node_modules/*"],
  },
  eslintConfigPrettier,
];
