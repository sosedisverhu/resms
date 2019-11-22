require('@babel/register')({
  presets: ['@babel/preset-env'],
  ignore: ['node_modules', '.next'],
  plugins: [
    ['@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
});

module.exports = require('./server.js');
