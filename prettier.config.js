/** @type {import('prettier').Config} */
export default {
  overrides: [
    {
      files: '*.ts?(x)',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: 'knip.jsonc',
      options: {
        trailingComma: 'none',
      },
    },
  ],
  singleQuote: true,
};
