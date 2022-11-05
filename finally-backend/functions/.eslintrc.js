module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'sort-imports-es6-autofix',
    'prettier',
    'import',
  ],
  ignorePatterns: ['dist/**'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        semi: false,
        arrowParens: 'avoid',
        printWidth: 80,
      },
    ],

    'no-alert': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-new-wrappers': 'error',
    'no-sequences': 'warn',
    'no-unmodified-loop-condition': 'error',
    'no-useless-return': 'error',
    'no-undef-init': 'warn',
    'no-undefined': 'error',

    complexity: ['error', 12],
    eqeqeq: 'error',
    'id-length': ['error', { min: 1, max: 35 }],
    'max-depth': ['error', 5],
    'max-lines': [
      'error',
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    'max-lines-per-function': [
      'error',
      { max: 120, skipBlankLines: true, skipComments: true },
    ],
    'max-nested-callbacks': ['error', 5],
    'max-params': ['error', 6],
    'max-statements': ['error', 25],
    'max-statements-per-line': ['error', { max: 3 }],
    'no-array-constructor': 'warn',
    'no-duplicate-imports': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'warn',
    'sort-vars': 'error',

    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    '@typescript-eslint/no-empty-interface': 'off',

    // Disabled for autoimports to work well
    '@typescript-eslint/no-namespace': 'off',

    'no-extra-parens': 'off',
    'no-warning-comments': ['error', { location: 'anywhere' }],
  },
}
