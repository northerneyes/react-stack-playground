require('babel-register')({
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node',
  ],
  presets: [
    'react',
    ['env', { targets: { node: true } }],
  ],
});
require('./main');
