import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import angular from 'angular-eslint';
import tailwindcss from 'eslint-plugin-tailwindcss';

import { RulesConfig } from '@eslint/core';

const tailwindRules: Partial<RulesConfig> = {
  'tailwindcss/classnames-order': 'warn',
  'tailwindcss/no-contradicting-classname': 'error',
  'tailwindcss/no-custom-classname': 'off',
  'tailwindcss/enforces-shorthand': 'warn',
};

const tsRules: Partial<RulesConfig> = {
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-confusing-void-expression': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-extraneous-class': 'off',
  '@typescript-eslint/no-misused-spread': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/no-unnecessary-type-parameters': 'off',
};

const jsRules: Partial<RulesConfig> = {
  'arrow-body-style': 'error',
  curly: 'error',
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'guard-for-in': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-eval': 'error',
  'no-labels': 'error',
  'no-new': 'error',
  'no-new-wrappers': 'error',
  'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
  radix: 'error',
  'spaced-comment': ['warn', 'always'],
};
export default defineConfig([
  globalIgnores(['node_modules', 'dist', '.idea', '.git', '.angular', '.husky', 'AGENTS.md']),
  // =========================
  // ANGULAR + TYPESCRIPT + INLINE TEMPLATE + TAILWIND
  // =========================
  {
    files: ['**/*.ts'],
    plugins: {
      js,
      // @ts-expect-error plugin exists and working
      tailwindcss,
    },
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // ---------------- Angular ----------------
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'x',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'x',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/relative-url-prefix': 'error',
      ...tsRules,
      ...jsRules,
      ...tailwindRules,
    },
  },
  tseslint.configs.recommended,
  // =========================
  // UNIT TESTS
  // =========================
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  // =========================
  // ANGULAR HTML TEMPLATES (external)
  // =========================
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    plugins: {
      // @ts-expect-error plugin exists and working
      tailwindcss,
    },
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      ...tailwindRules,
    },
  },
  // =========================
  // JSON
  // =========================
  { files: ['**/*.json'], ignores: ['**/tsconfig*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.jsonc', '**/tsconfig*.json'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
]);
