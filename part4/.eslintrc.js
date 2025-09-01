module.exports = {
    "env": {
      "es2021": true,
      "node": true,
      "jest": true
    },
    "extends": ["eslint:recommended", "plugin:jest/recommended"],
    "plugins": ["jest"],
    "rules": {
      "jest/no-focused-tests": "error"
    }
  }
  