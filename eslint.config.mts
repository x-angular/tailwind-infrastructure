import { RulesConfig } from '@eslint/core';
import js from '@eslint/js';
import json from '@eslint/json';
import angular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const tsRules: Partial<RulesConfig> = {
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
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
  globalIgnores(['node_modules', 'dist', '.idea', '.git', '.angular', '.vscode', '.codex', '.cursor', '.gemini', '.husky', '.graphify']),
  // =========================
  // ANGULAR + TYPESCRIPT + INLINE TEMPLATE + COMMANDS
  // =========================
  {
    files: ['**/*.ts'],
    plugins: {
      js,
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
    },
  },
  {
    files: ['cli/**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylistic],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        project: 'tsconfig.cmd.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...tsRules,
      ...jsRules,
      'no-console': 'off',
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
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/label-has-associated-control': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
  // =========================
  // JSON
  // =========================
  { files: ['**/*.json'], ignores: ['**/tsconfig*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.jsonc', '**/tsconfig*.json'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
]);
