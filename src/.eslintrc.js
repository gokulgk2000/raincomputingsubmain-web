module.exports = {
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react', 'react-hooks'],
    rules: {
      'react/prop-types': 'off', // If you don't use prop types
      // Add other rules as needed
      "no-undef": "off",
      "react/no-unknown-property": ["off", { "ignore": ["download"] }]
    },
  };