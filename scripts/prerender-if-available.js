const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');

const reactSnapBin = resolve(__dirname, '../node_modules/.bin/react-snap');

if (!existsSync(reactSnapBin)) {
  console.log('react-snap is not installed locally. Skipping prerender.');
  process.exit(0);
}

const result = spawnSync(reactSnapBin, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status || 0);
