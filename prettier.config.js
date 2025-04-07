/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  bracketSameLine: true,
  trailingComma: 'none',
  arrowParens: 'always',
  bracketSpacing: true,
  proseWrap: 'always',
  singleQuote: true,
  printWidth: 140,
  endOfLine: 'lf',
  useTabs: false,
  tabWidth: 2,
  semi: true
};

export default config;
