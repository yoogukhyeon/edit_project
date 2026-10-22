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
  console.error(`react-snap failed with exit code ${result.status}. build/ is only partially prerendered — run \`npm run build\` again.`);
  process.exit(result.status);
}

process.exit(0);
