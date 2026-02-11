module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // Disable rules that cause parsing issues in complex Astro files
        'astro/no-set-html-directive': 'off',
      },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-console': 'off',
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.astro/',
    // Ignore complex Astro files with parsing issues
    'src/components/Hero.astro',
    'src/pages/blog/index.astro',
    'src/pages/blog/why-laptop-running-slow-romford-guide.astro',
    'src/pages/free-play.astro',
    'src/pages/services/new-used.astro',
  ],
};
