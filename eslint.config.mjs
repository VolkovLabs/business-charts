import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import grafanaConfig from '@grafana/eslint-config/flat.js';
import eslintConfig from '@volkovlabs/eslint-config';

/**
 * Config
 */
export default defineConfig(
  ...grafanaConfig,
  eslintConfig,
  prettierConfig,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  globalIgnores([
    '.config/*',
    '.prettierrc.js',
    'coverage/*',
    'dist/*',
    'eslint.config.mjs',
    'jest*.js',
    'playwright.config.ts',
    'src/__mocks__/**',
    'src/**/*.test.ts*',
    'test/*',
    'webpack.config.ts',
    'websocket/*',
  ])
);
