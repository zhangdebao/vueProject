module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    parserOptions: {
      sourceType: 'module'
    },
    "plugins": [
      "eslint-plugin-html"
    ],
    /*'import' and 'export' may appear only with 'sourceType: module错误'*/
    extends: 'standard',
    "rules": {
        'generator-star-spacing': 'off'
    }
};
