module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["react", "import"],
  
    rules: {
      "import/no-unresolved": "error"
    },
  };