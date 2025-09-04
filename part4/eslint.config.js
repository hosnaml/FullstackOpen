module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...require('globals').node,
      },
    },
    rules: {
      // Basic ESLint rules
      'no-unused-vars': 'error',
      'no-console': 'warn',
    },
  },
  {
    files: ['tests/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...require('globals').node,
        // Node test runner globals
        test: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      // Custom rule to detect test.only
      'no-restricted-properties': [
        'error',
        // {
        //   object: 'test',
        //   property: 'only',
        //   message: 'test.only should not be committed. Use test() instead.',
        // },
        {
          object: 'describe',
          property: 'only',
          message: 'describe.only should not be committed. Use describe() instead.',
        },
      ],
    },
  },
];
