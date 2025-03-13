/** @type {import('prettier').Config} */
export default {
  overrides: [
    {
      files: '*.jsonc',
      options: {
        trailingComma: 'none',
      },
    },
  ],
  singleQuote: true,
};
