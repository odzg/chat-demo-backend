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
      name: 'typescript-eslint',
    },
    {
      extends: [jsdoc.configs['flat/recommended-typescript-error']],
      files: [GLOB_TS],
      name: 'jsdoc/typescript',
    },
    {
      extends: [jsdoc.configs['flat/recommended-typescript-flavor-error']],
      files: [GLOB_JS],
      name: 'jsdoc/javascript',
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- No type declaration
      extends: [comments.recommended],
      name: 'comments',
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginJsonc.configs['flat/prettier'],
      ],
      name: 'jsonc',
    },
    {
      ignores: [GLOB_PACKAGE_JSON],
      name: 'jsonc/sort-keys-except-package-json',
      rules: {
        'jsonc/sort-keys': 'error',
      },
    },
    {
      extends: [eslintPluginJsonSchemaValidator.configs['flat/recommended']],
      name: 'json-schema-validator',
    },
    {
      extends: [markdown.configs.recommended],
      name: 'markdown',
    },
    {
      extends: [nodePlugin.configs['flat/recommended']],
      name: 'node',
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- No type declaration
      extends: [pluginSecurity.configs.recommended],
      name: 'security',
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- No type declaration
      extends: [pluginPromise.configs['flat/recommended']],
      name: 'promise',
    },
    {
      extends: [perfectionist.configs['recommended-natural']],
      name: 'perfectionist',
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginYml.configs['flat/recommended'],
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginYml.configs['flat/prettier'],
      ],
      name: 'yml',
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginImportX.flatConfigs.recommended,
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginImportX.flatConfigs.typescript,
      ],
      name: 'import-x',
    },
    {
      extends: [eslintPluginUnicorn.configs.recommended],
      name: 'unicorn',
    },
    {
      extends: [sonarjs.configs.recommended],
      name: 'sonarjs',
    },
    {
      extends: [regexpPlugin.configs['flat/recommended']],
      name: 'regexp',
    },
    {
      extends: [deMorgan.configs.recommended],
      name: 'demorgan',
    },
    {
      extends: [eslintPluginMath.configs.recommended],
      name: 'math',
    },
    {
      extends: [moduleInterop.configs.recommended],
      name: 'module-interop',
    },
    {
      extends: [packageJson.configs.recommended],
      name: 'package-json',
    },
    {
      extends: [eslintConfigPrettier],
      name: 'prettier',
    },
    {
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
      files: [GLOB_JS, GLOB_TS],
      name: 'typescript-eslint/rule-overrides',
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
