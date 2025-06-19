import type { Linter } from 'eslint';

// @ts-expect-error Currently does not include a type-declaration file
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import deMorgan from 'eslint-plugin-de-morgan';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import eslintPluginMath from 'eslint-plugin-math';
import moduleInterop from 'eslint-plugin-module-interop';
import nodePlugin from 'eslint-plugin-n';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error Currently does not include a type-declaration file
import pluginPromise from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error Currently does not include a type-declaration file
import pluginSecurity from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginYml from 'eslint-plugin-yml';
import typegen from 'eslint-typegen';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const GLOB_JS = '**/*.?([cm])js';
const GLOB_PACKAGE_JSON = '**/package.json';
const GLOB_TS = '**/*.?([cm])ts';

export default typegen(
  defineConfig([
    gitignore(),
    globalIgnores([
      /* Auto-generated files/directories that are not included in .gitignore */
      'pnpm-lock.yaml',

      /* Dot files/directories which should NOT be ignored */
      '!.dependency-cruiser.js',
      '!.vscode',
    ]),
    {
      extends: ['js/recommended'],
      files: [GLOB_JS, GLOB_TS],
      name: js.meta.name,
      plugins: { js },
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        tseslint.configs.strictTypeChecked,
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        tseslint.configs.stylisticTypeChecked,
      ],
      files: [GLOB_JS, GLOB_TS],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      } satisfies ConfigArray[number]['languageOptions'],
      name: tseslint.plugin.meta?.name,
    },
    {
      ...jsdoc.configs['flat/recommended-typescript-error'],
      files: [GLOB_TS],
    },
    {
      ...jsdoc.configs['flat/recommended-typescript-flavor-error'],
      files: [GLOB_JS],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    comments.recommended as Linter.Config,
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginJsonc.configs['flat/prettier'],
      ],
      name: eslintPluginJsonc.meta.name,
    },
    {
      ignores: [GLOB_PACKAGE_JSON],
      name: `${eslintPluginJsonc.meta.name}/sort-keys-except-package-json`,
      rules: {
        'jsonc/sort-keys': 'error',
      },
    },
    {
      extends: [eslintPluginJsonSchemaValidator.configs['flat/recommended']],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- For some reason `eslintPluginJsonSchemaValidator.meta` is seen as `any` by TypeScript
      name: eslintPluginJsonSchemaValidator.meta.name,
    },
    markdown.configs.recommended,
    nodePlugin.configs['flat/recommended'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    pluginSecurity.configs.recommended as Linter.Config,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    pluginPromise.configs['flat/recommended'] as Linter.Config,
    {
      extends: [perfectionist.configs['recommended-natural']],
      name: perfectionist.meta.name,
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginYml.configs['flat/recommended'],
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginYml.configs['flat/prettier'],
      ],
      name: eslintPluginYml.meta.name,
    },
    // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
    eslintPluginImportX.flatConfigs.recommended,
    // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
    eslintPluginImportX.flatConfigs.typescript,
    eslintPluginUnicorn.configs.recommended,
    sonarjs.configs.recommended,
    {
      ...regexpPlugin.configs['flat/recommended'],
      name: 'eslint-plugin-regexp/flat/recommended',
    },
    {
      ...deMorgan.configs.recommended,
      name: `${deMorgan.meta.name}/recommended`,
    },
    {
      ...eslintPluginMath.configs.recommended,
      name: `${eslintPluginMath.meta.name}/recommended`,
    },
    {
      ...moduleInterop.configs.recommended,
      name: `${moduleInterop.meta.name}/recommended`,
    },
    packageJson.configs.recommended,
    eslintConfigPrettier,
    {
      extends: [
        {
          files: [GLOB_JS, GLOB_TS],
          name: 'js-and-ts-files-only',
          rules: {
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/consistent-type-imports': [
              'error',
              { fixStyle: 'inline-type-imports' },
            ],
            '@typescript-eslint/no-empty-object-type': [
              'error',
              { allowInterfaces: 'with-single-extends' },
            ],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-unused-vars': [
              'error',
              { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
          },
        },
      ],
      name: 'rule-overrides',
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error',
        'import-x/default': 'off', // TypeScript already enforces this
        'import-x/named': 'off', // TypeScript already enforces this
        'import-x/namespace': 'off', // TypeScript already enforces this
        'import-x/newline-after-import': 'error',
        'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
        'import-x/no-named-as-default-member': 'off', // TypeScript already enforces this
        'jsdoc/require-jsdoc': 'off', // Too restrictive
        'n/no-missing-import': 'off', // This is already enforced either by TypeScript or by `import-x/no-unresolved`
        'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],
        'security/detect-object-injection': 'off', // Too restrictive
        'unicorn/no-null': 'off', // Too restrictive
        'unicorn/prevent-abbreviations': [
          'error',
          {
            ignore: [/env/i, /props$/i, /params$/i],
          },
        ],
      },
    },
    {
      linterOptions: {
        reportUnusedInlineConfigs: 'error',
      },
      name: 'linter-options',
    },
    {
      name: 'settings',
      settings: {
        'import-x/resolver-next': createTypeScriptImportResolver(),
      },
    },
  ]),
);
