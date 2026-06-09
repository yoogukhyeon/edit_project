const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');

const reactSnapBin = resolve(__dirname, '../node_modules/.bin/react-snap');

if (process.env.VERCEL === '1' || process.env.CI === 'true') {
  console.log('Skipping react-snap prerender in CI/Vercel build.');
  process.exit(0);
}

if (!existsSync(reactSnapBin)) {
  console.log('react-snap is not installed locally. Skipping prerender.');
  process.exit(0);
}

const result = spawnSync(reactSnapBin, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status) {
  console.log(`react-snap failed with exit code ${result.status}. Skipping prerender output.`);
}

process.exit(0);
