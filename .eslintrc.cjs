module.exports = {
  extends: [require.resolve('@mt/eslint/packages/be-config')],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
