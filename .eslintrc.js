module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/essential'
  ],
  rules: {
    'prefer-destructuring': 'off',
    'no-param-reassign': ['error', {'props': false}],
    'comma-dangle': ['error', 'never'],
    'semi': 'off'
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    expect: true
  }
}
