module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["jest", "@typescript-eslint"],
  rules: {
    indent: ["error", 2]
  },
  env: {
    "jest/globals": true,
    es6: true,
    node: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".js"]
      }
    }
  }
};
