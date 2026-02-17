/**
 * @file eslint.config.ts
 * @brief ESLint flat configuration for the project.
 * @details Configures TypeScript and NestJS-specific lint rules. Uses
 * @typescript-eslint parser and plugin for TypeScript support.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

/* eslint-disable require-jsdoc */

import type { ESLint, Linter } from 'eslint';
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';

/**
 * @var tsparser
 * @type Linter.Parser
 * @brief TypeScript parser for ESLint.
 * @details Loaded via require to avoid module resolution issues with the config loader.
 */
const tsparser: Linter.Parser = require('@typescript-eslint/parser');

/**
 * @var tsconfigRootDir
 * @type string
 * @brief Root directory for TypeScript project resolution.
 * @details Used by the parser to resolve tsconfig.json paths.
 */
const tsconfigRootDir: string = process.cwd();

/**
 * @var files
 * @type readonly string[]
 * @brief Glob patterns for files to lint.
 * @details Matches all TypeScript and TSX files.
 */
const files: readonly string[] = ['**/*.ts', '**/*.tsx'] as const;

/**
 * @var globals
 * @type Linter.Globals
 * @brief Global variable declarations for the lint environment.
 * @details Includes Node.js, Jest, and browser globals.
 */
const globals: Linter.Globals = {
  node: true,
  process: 'readonly',
  global: 'readonly',
  fetch: 'readonly',
  jest: true,
  describe: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
};

/**
 * @var languageOptions
 * @type Linter.LanguageOptions
 * @brief Language and parser options for the configuration.
 * @details Configures the TypeScript parser with project-aware type checking.
 */
const languageOptions: Linter.LanguageOptions = {
  parser: tsparser,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir,
  },
  globals,
};

/**
 * @var plugins
 * @type Record<string, Linter.Plugin>
 * @brief ESLint plugins for this configuration.
 * @details Registers the TypeScript ESLint plugin.
 */
const plugins: Record<string, ESLint.Plugin> = {
  '@typescript-eslint': tseslint,
};

/**
 * @var customRules
 * @type Linter.RulesRecord
 * @brief Rule overrides for the TypeScript ESLint plugin.
 * @details Extends recommended rules with project-specific adjustments.
 */
const customRules: Linter.RulesRecord = {
  ...tseslint.configs.recommended.rules,
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
};

/**
 * @var typescriptConfig
 * @type Linter.Config
 * @brief Flat config object for TypeScript and TSX files.
 * @details Applies parser, plugins, and rules to the matched files.
 */
const typescriptConfig: Linter.Config = {
  files: [...files],
  languageOptions,
  plugins,
  rules: customRules,
};

/**
 * @var config
 * @type Linter.Config[]
 * @brief ESLint flat configuration array.
 * @details Exported configuration for ESLint flat config format.
 */
const config: Linter.Config[] = [
  eslint.configs.recommended,
  typescriptConfig,
];

export default config;
