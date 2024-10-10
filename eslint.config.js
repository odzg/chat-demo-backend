// @ts-expect-error Currently does not include a type-declaration file
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslint from '@eslint/js';
import markdown from '@eslint/markdown';
// @ts-expect-error Currently does not include a type-declaration file
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import nodePlugin from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error Currently does not include a type-declaration file
import pluginPromise from 'eslint-plugin-promise';
// @ts-expect-error Currently does not include a type-declaration file
import pluginSecurity from 'eslint-plugin-security';
import eslintPluginYml from 'eslint-plugin-yml';
import typegen from 'eslint-typegen';
import tseslint from 'typescript-eslint';

const JS_EXTENSIONS_GLOB = '**/*.{js,cjs}';
const TS_EXTENSIONS_GLOB = '**/*.{ts,tsx}';
const JS_TS_EXTENSION_GLOBS = [JS_EXTENSIONS_GLOB, TS_EXTENSIONS_GLOB];

export default typegen([
  {
    ignores: [
      /* Specific dot-files/dot-directories which should not be auto-ignored */
      '!.dependency-cruiser.js',
      '!.vscode',

      /* Auto-generated files/directories */
      'dist',
      'eslint-typegen.d.ts',
      'pnpm-lock.yaml',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.config({
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: JS_TS_EXTENSION_GLOBS,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }),
  {
    files: JS_TS_EXTENSION_GLOBS,
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
  comments.recommended,
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  ...eslintPluginJsonc.configs['flat/prettier'],
  ...eslintPluginJsonSchemaValidator.configs['flat/recommended'],
  ...(Array.isArray(markdown.configs?.processor)
    ? markdown.configs.processor
    : []),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
  pluginSecurity.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
  pluginPromise.configs['flat/recommended'],
  perfectionist.configs['recommended-natural'],
  ...eslintPluginYml.configs['flat/recommended'],
  ...eslintPluginYml.configs['flat/prettier'],
  nodePlugin.configs['flat/recommended-script'],
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    files: [TS_EXTENSIONS_GLOB],
    ...jsdoc.configs['flat/recommended-typescript-error'],
  },
  {
    files: [JS_EXTENSIONS_GLOB],
    ...jsdoc.configs['flat/recommended-typescript-flavor-error'],
  },
  {
    rules: {
      'import-x/default': 'off', // TypeScript already enforces this
      'import-x/named': 'off', // TypeScript already enforces this
      'import-x/namespace': 'off', // TypeScript already enforces this
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/no-named-as-default-member': 'off', // TypeScript already enforces this
      'import-x/no-unresolved': ['error', { commonjs: true }],
      'jsonc/sort-keys': 'error',
      'n/no-missing-import': 'off', // This is already enforced either by TypeScript or by `import-x/no-unresolved`
      'n/no-unpublished-import': [
        'error',
        {
          ignoreTypeImport: true,
        },
      ],
      'no-console': ['error', { allow: ['error'] }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          internalPattern: ['@/**'],
          newlinesBetween: 'always',
        },
      ],
      'security/detect-object-injection': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'n/no-unpublished-import': 'off', // `eslint.config.js` is expected to import many ESLint plugins which are considered "devDependencies"
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // CommonJS files may only use "require()" to import modules
    },
  },
  {
    files: ['package.json'],
    rules: {
      'jsonc/sort-keys': 'off', // Sorting of keys within `package.json` is enforced by `syncpack`
    },
  },
  eslintConfigPrettier,
]);
